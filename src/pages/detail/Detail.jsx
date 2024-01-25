import { FaDownload, FaLock } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import Spinner from "../../components/Spinner";
import { AnimatePresence } from "framer-motion";
import SendEmailModal from "./Modal/SendEmail";
import { useAuthStore } from "../../store/auth";
import { API_BASE_URL } from "../../utils/constants";
import { ethers } from "ethers";
import Contract from "../../utils/useContract";
import { useAccount } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import { useEthersSigner } from "../../utils/EthSigner";
import Column1 from "./Column1";
import AddNewUser from "./Modal/AddUserModal";

export default function Detail() {
  const [data, setData] = useState([]);
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [loadingTobuy, setLoadingTobuy] = useState(false);
  const [error, setError] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [openModal, setOpenModal] = useState(false);
  const [listingData, setListengData] = useState(0);
  const [listed, setListed] = useState(false);
  const provider = useEthersSigner();
  const [buyerData, setBuyerData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [changed, setChanged] = useState(false);
  const { id } = useParams();
  const api = useAxios();

  function handleSelect(user) {
    const item = selectedUsers.find((el) => el.user === user);
    if (item) {
      setSelectedUsers((prev) => prev.filter((el) => el.user !== user));
    } else {
      const el = buyerData.find((el) => el.user === user);
      setSelectedUsers((prev) => [...prev, { ...el }]);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get(`/properties/${id}`);
      const auth = await api.post(`download/${id}/1/`, {});
      setIsAuthorized(auth.data.status);
      setData(response.data);
      setLoading(false);
      try {
        const response = await api.get(`listed/${id}`);
        setListengData(response.data);
        setListed(true);
      } catch (error) {
        setListed(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }

  const AllBuyers = async () => {
    try {
      const data = await api.get(`buyers/${id}`);
      setBuyerData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function BuyWithEth() {
    setLoadingTobuy(true);

    if (!isConnected) {
      toast.error("please connect your wallet");
      setLoadingTobuy(false)
      return;
    }
    try {
      const contract = await Contract(provider);
      const ethValue = ethers.parseUnits(
        listingData?.price_in_eth?.toString(),
        "ether"
      );
      const tokenval = ethers.parseUnits(
        listingData?.price_in_token?.toString(),
        "ether"
      );
      console.log(ethValue);
      const tx = await contract.buyWithEth(id, { value: ethValue });
      await tx.wait();
      await api.post("autorize/", { id: id });
      toast.success("bought successfully");
      fetchData();
    } catch (error) {
      toast.error(`${error.message != undefined ? error.message : error}`);
      console.log(error);
      setLoadingTobuy(false);
    }
    setLoadingTobuy(false);
  }

  useEffect(() => {}, []);

  useEffect(() => {
    isLoggedIn && fetchData();
    AllBuyers();
  }, [isLoggedIn, changed]);

  if (loading)
    return (
      <div className="w-full h-screen grid place-content-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <SendEmailModal
            data={selectedUsers}
            closeModal={setOpenModal}
            setSelected={handleSelect}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openAddUser && (
          <AddNewUser closeModal={setOpenAddUser} setChanged={setChanged} />
        )}
      </AnimatePresence>
      <div className="bg-gray-100">
        <main className="max-w-7xl mx-auto lg:py-10 py-3 font-poppins grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Column1
            data={data}
            isAuthorized={isAuthorized}
            propertyId={id}
            setData={setData}
          />

          <div className="col-span-full lg:col-span-1 rounded-xl p-4 bg-white flex flex-col gap-6">
            {/* appraisal  */}
            <div className="flex flex-col gap-2 rounded-lg border border-primary px-3 py-5 max-w-sm">
              <span className="text-xl text-gray-700 font-bold flex justify-between gap-5 flex-col-reverse">
                Appraisal <IoMdDocument className="text-primary text-6xl" />
              </span>

              <p className="text-md bg-gray-100 p-1 rounded-lg text-sm mb-4">
                click to view file
              </p>

              {isAuthorized ? (
                <a
                  href={`${API_BASE_URL}/download/${id}/1`}
                  className="border-2 border-primary text-gray-700
						hover:text-white hover:bg-primary transition-all py-2 rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  Download <FaDownload />
                </a>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    BuyWithEth();
                  }}
                  disabled={loadingTobuy}
                  className="border-2 border-primary text-gray-700
						hover:text-white hover:bg-primary transition-all py-2 rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  {loadingTobuy ? "Please wait..." : "Click to Unlock "}
                  <FaLock />
                </a>
              )}
            </div>

            {/* deed of ownership  */}
            <div className="flex flex-col gap-2 rounded-lg border border-primary px-3 py-5 max-w-sm">
              <span className="text-xl text-gray-700 font-bold flex justify-between gap-5 flex-col-reverse">
                Deed of Ownership{" "}
                <IoMdDocument className="text-primary text-6xl" />
              </span>

              <p className="text-md bg-gray-100 p-1 rounded-lg text-sm mb-4">
                click to view file
              </p>

              {isAuthorized ? (
                <a
                  href={`${API_BASE_URL}/download/${id}/2`}
                  className="border-2 border-primary text-gray-700
						hover:text-white hover:bg-primary transition-all py-2 rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  Download <FaDownload />
                </a>
              ) : (
                <a
                  href={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    BuyWithEth();
                  }}
                  disabled={loadingTobuy}
                  className="border-2 border-primary text-gray-700
						hover:text-white hover:bg-primary transition-all py-2 rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  {loadingTobuy ? "Please wait..." : "Click to Unlock "}{" "}
                  <FaLock />
                </a>
              )}
            </div>
            {/* download button  */}

            {!isAuthorized ? (
              <button
                disabled={loadingTobuy}
                onClick={BuyWithEth}
                className="rounded-xl border-2 py-2 font-bold text-gray-700 border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                {loadingTobuy ? "Please wait..." : "Buy Now"}
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-bold text-center text-xl flex justify-between items-center">
                  Authorized Users
                  <button
                    onClick={() => setOpenAddUser(true)}
                    className="text-xs p-1 rounded bg-gray-800 text-white font-medium hover:bg-primary"
                  >
                    Add User
                  </button>
                </p>
                {buyerData.map((el, i) => (
                  <ListElement
                    key={el.id}
                    data={el}
                    index={i}
                    selected={selectedUsers}
                    setSelected={handleSelect}
                  />
                ))}
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-max px-5 py-2 rounded-md text-white font-semibold self-center bg-gray-800 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70 transition-all"
                >
                  Send Updates
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

const ListElement = ({ data, selected, setSelected }) => {
  const isSeleted = Boolean(selected.find((el) => el.user === data.user));
  return (
    <div
      onClick={() => setSelected(data.user)}
      className="py-4 px-2 cursor-pointer border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg text-xs"
    >
      <input type="checkbox" readOnly checked={isSeleted} />
      <img
        src={data.profile_photo}
        alt=""
        className="w-12 aspect-square rounded-full border-2 border-gray-700 object-cover"
      />
      <span className="w-52 font-semibold">{data?.username}</span>
      <span className="w-full text-end font-medium underline">
        {data?.date}
      </span>
    </div>
  );
};
