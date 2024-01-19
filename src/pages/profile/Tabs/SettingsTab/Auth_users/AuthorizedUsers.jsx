import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useAxious from "../../../../../utils/useAxios";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import AddUserModal from "./AuthUserModals/Add";
import EditUserModal from "./AuthUserModals/Edit";
import Spinner from "../../../../../components/Spinner";
import { API_BASE_URL } from "../../../../../utils/constants";

export default function AuthorizedUsers({ users }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const api = useAxious();
  const [active, setActive] = useState("Appraiser");
  const [filteredData, setFilteredData] = useState([]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await api.get(`/authorized_users/owner`);
      setData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("unknown error has occoured");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data.filter((el) => el.role === active));
    } else {
      setFilteredData([]);
    }
  }, [data, active]);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center py-2 col-span-full">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 col-span-full">
      <div className="justify-between flex items-center">
        <select
          className="border-2 rounded w-max p-1 border-gray-800 font-poppins font-semibold"
          onChange={(e) => {
            setActive(e.target.value);
          }}
          value={active}
        >
          <option value="Appraiser">Appraiser</option>
          <option value="Agent">Agent</option>
          <option value="Buyer">Buyer</option>
        </select>
      </div>

      <div className="flex flex-col font-poppins">
        <div className="py-4 px-2 text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-md border-2 border-gray-800 mb-5">
          <span className="font-semibold">S.no</span>
          <span className="w-52 font-semibold">Name</span>
          <span className="w-full text-end font-medium underline">Type</span>
        </div>

        <>
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <ListElement
                key={item.id}
                index={i}
                active={active}
                {...item}
                fetchData={fetchData}
              />
            ))
          ) : (
            <div className="text-lg font-semibold text-center">
              No Documents
            </div>
          )}
        </>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

const ListElement = ({
  active,
  id,
  edit_permissions,
  created_at,
  profile_photo,
  role,
  username,
  fetchData,
}) => {
  const options = ["change permission", "Buyer", "Agent", "Appraiser"];
  const [loading, setLoading] = useState(false);
  const api = useAxious();

  async function handleChange(value) {
    if (value !== options[0]) {
      try {
        setLoading(true);
        const res = await api.put(`/authorized_users/modify/${id}/`, { value });
        await fetchData();
        toast.success("Update success");
        // console.log(res);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    }
  }
  async function handleDelete() {
    try {
      setLoading(true);
      await api.delete(`/authorized_users/modify/${id}/`);
      toast.success("Request Successfully");
      await fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="py-4 md:px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs relative">
      <div className="w-[70px] md:w-8 text-xs bg-gray-800 text-white md:text-sm flex justify-center items-center aspect-square rounded-full overflow-hidden">
        <img
          src={profile_photo}
          alt="user profile image"
          className="max-w-full object-cover"
        />
      </div>
      <span className="w-52 font-semibold">{username}</span>
      <div className="flex items-center gap-2 text-2xl">
        <select
          disabled={loading}
          onChange={(e) => handleChange(e.target.value)}
          className="border-0 font-medium text-center text-green-500 md:border-2 whitespace-nowrap p-0.5 rounded border-gray-800 md:text-gray-800 hover:text-white hover:bg-gray-800 text-[10px] md:text-xs"
        >
          {options.map((option) =>
            option === active ? null : <option key={option}>{option}</option>
          )}
        </select>
        <MdDeleteForever
          onClick={handleDelete}
          className="hover:scale-150 hover:text-red-600 hover:-translate-y-1 transition-all duration-150"
          title="delete"
        />

        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/30">
            <Spinner />
          </div>
        )}
      </div>
      <span className="text-end font-medium underline w-full">{role}</span>
    </div>
  );
};
