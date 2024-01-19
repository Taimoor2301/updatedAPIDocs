import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "../../../../../components/Spinner";
import { FaEye } from "react-icons/fa";

import useAxious from "../../../../../utils/useAxios";
import { MdEditSquare } from "react-icons/md";
import toast from "react-hot-toast";
import EditDataModal from "../../../Modal/EditDataModal";

export default function AuthorizedUsers({ users }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [added, setAdded] = useState(false);
  const api = useAxious();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get(`/authorized_users/auther`);
        setData(res.data);
      } catch (error) {
        console.log(error);
        toast.error("unknown error has occoured");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [added]);

  if (loading)
    return (
      <div className="flex w-full items-center justify-center py-2 col-span-full">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 col-span-full pt-5">
      <div className="flex flex-col font-poppins">
        <div className="py-4 px-2 text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-md border-2 border-gray-800 mb-5">
          <span className="font-semibold">S.no</span>
          <span className="w-52 font-semibold">Name</span>
          <span className="w-full text-end font-medium underline">Type</span>
        </div>

        <>
          {data.map((item, i) => (
            <ListElement key={item.property_id} {...item} setAdded={setAdded} />
          ))}
        </>
      </div>
    </div>
  );
}

const ListElement = ({
  date_created,
  setAdded,
  edit_permission,
  owner_image,
  owner_name,
  property_id,
  property_title,
  role,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="py-4 md:px-2 border-b flex items-center flex-col md:flex-row text-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs">
      <AnimatePresence>
        {openEditModal && edit_permission && (
          <EditDataModal
            closeModel={setOpenEditModal}
            setAdded={setAdded}
            id={property_id}
            updater={role}
          />
        )}
      </AnimatePresence>

      <div className="w-[70px] md:w-8 text-xs overflow-hidden bg-gray-800 text-white md:text-sm flex justify-center items-center aspect-square rounded-full">
        <img
          src={owner_image}
          alt="profile image"
          className="max-w-full object-cover"
        />
      </div>
      <span className="w-52 font-semibold">{property_title}</span>

      <span className="bg-gray-800 text-white p-1 text-xs mx-2 rounded">
        {role}
      </span>
      <div className="flex items-center gap-2 text-2xl">
        <Link to={`/details/${property_id}`}>
          <FaEye
            title="view"
            className="hover:scale-150 hover:-translate-y-1 transition-all duration-150 hover:text-gray-800"
          />
        </Link>
        {edit_permission && (
          <MdEditSquare
            title="edit"
            onClick={() => setOpenEditModal(true)}
            className="hover:scale-150 hover:text-gray-800 hover:-translate-y-1 transition-all duration-150"
          />
        )}
      </div>
      <span className="md:text-end font-medium underline w-full">
        {date_created}
      </span>
    </div>
  );
};
