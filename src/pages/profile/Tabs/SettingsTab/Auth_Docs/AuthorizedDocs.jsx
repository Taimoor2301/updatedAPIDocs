import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "../../../../../components/Spinner";

import useAxious from "../../../../../utils/useAxios";
// import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import AddUserModal from "./AuthDocsModals/Add";
import EditUserModal from "./AuthDocsModals/Edit";

export default function AuthorizedUsers({ users }) {
  const [openAddNewModel, setOpenAddNewModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState();
  const [data, setData] = useState([]);

  const api = useAxious();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get(`/authorized_users/auther`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        toast.error("unknown error has occoured");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center py-2 col-span-full">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 col-span-full">
      <button
        className="bg-gray-800 text-white text-xs p-2 w-28 rounded font-medium tracking-wider hover:bg-primary flex justify-center items-center gap-1 group self-end transition-all"
        onClick={() => setOpenAddNewModel(true)}
      >
        Add New{" "}
        <FaPlus className="group-hover:rotate-[270deg] transition-all duration-700" />
      </button>

      <AnimatePresence>
        {openAddNewModel && <AddUserModal closeModel={setOpenAddNewModel} />}
      </AnimatePresence>

      <div className="flex flex-col font-poppins">
        <div className="py-4 px-2 text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-md border-2 border-gray-800 mb-5">
          <span className="font-semibold">S.no</span>
          <span className="w-52 font-semibold">Name</span>
          <span className="w-full text-end font-medium underline">Type</span>
        </div>

        <>
          {data.map((item, i) => (
            <ListElement key={item.id} {...item} />
          ))}
        </>
      </div>
    </div>
  );
}

const ListElement = ({
  authorized,
  created_at,
  date,
  edit_permissions,
  id,
  owner,
  profile_photo,
  username,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="py-4 md:px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs">
      <AnimatePresence>
        {openEditModal && (
          <EditUserModal closeModel={setOpenEditModal} id={id} />
        )}
      </AnimatePresence>

      <div className="w-[70px] md:w-8 text-xs bg-gray-800 text-white md:text-sm flex justify-center items-center aspect-square rounded-full overflow-hidden">
        <img
          src={profile_photo}
          alt="user profile image"
          className="max-w-full object-cover"
        />
      </div>

      <span className="w-52 font-semibold">{username}</span>
      {/* <div className='flex items-center gap-2 text-2xl'>
				<MdEditSquare
					title='edit'
					onClick={() => setOpenEditModal(true)}
					className='hover:scale-150 hover:text-gray-800 hover:-translate-y-1 transition-all duration-150'
				/>
				<MdDeleteForever
					onClick={() => deleteProperty(id)}
					className='hover:scale-150 hover:text-red-600 hover:-translate-y-1 transition-all duration-150'
					title='delete'
				/>
			</div> */}
      <span className="text-end font-medium underline w-full">
        {created_at}
      </span>
    </div>
  );
};
