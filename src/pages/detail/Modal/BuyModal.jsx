import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAxios from "../../../utils/useAxios";

export default function BuyModal({ closeModal, setChanged }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const roles = ["Select Role", "Appraiser", "Agent", "Buyer"];
  const { id } = useParams();

  const api = useAxios();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div
      className="bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]"
      onClick={() => closeModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-xl mx-auto lg:w-[80vw] w-[95vw] p-10 rounded-xl shadow-md gap-10 relative"
      >
        <IoCloseCircleOutline
          onClick={() => closeModal(false)}
          className="absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300"
        />

        <h1 className="text-xl font-bold text-center">Select Method</h1>

        <div className="flex gap-4 flex-col h-full justify-center">
          <button className="rounded bg-gray-800 text-white font-semibold border-2 border-gray-800 py-2 hover:bg-primary transition-all ease-out">
            Buy With Eath
          </button>
          <button className="rounded bg-primary font-semibold border-2 border-gray-800 py-2 hover:bg-primary transition-all ease-out">
            Buy With Token
          </button>
        </div>
      </motion.div>
    </div>
  );
}
