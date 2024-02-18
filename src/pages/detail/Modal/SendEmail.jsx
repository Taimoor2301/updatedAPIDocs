import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAxios from "../../../utils/useAxios";

export default function SendEmailModal({ data, closeModal, setSelected }) {
  const [subject, setSubject] = useState("");
  const [des, setDes] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useAxios();

  const { id } = useParams();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  async function handleSend() {
    const arr = data.map((el) => el.user);

    if (!arr.length) {
      toast.error("User List Empty!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/updates/send_email/", {
        subject,
        description: des,
        item_id: id,
        users_list: arr,
      });
      closeModal(false);
      toast.success("Updates Sent");
    } catch (error) {
      toast.error("error sending updates");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99995]"
      onClick={() => closeModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-7xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col py-8 items-center gap-10 relative"
      >
        <IoCloseCircleOutline
          onClick={() => closeModal(false)}
          className="absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300"
        />

        <h1 className="text-xl font-bold text-center">Authorized Users</h1>

        <div className="flex max-h-full overflow-auto w-full gap-5 flex-wrap-reverse">
          <div className="flex flex-col w-full lg:max-w-[45%]">
            <label htmlFor="">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="subject"
              className="w-full p-2 border-gray-700 border rounded-md"
            />

            <label htmlFor="des" className="pt-5 pb-1">
              Description
            </label>
            <textarea
              name="des"
              id="des"
              cols="30"
              rows="10"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              placeholder="subject"
              className="w-full p-2 border-gray-700 border rounded-md"
            ></textarea>

            <button
              disabled={loading || !subject || !des}
              className="w-44 px-5 py-2 rounded-md text-white font-semibold self-center bg-gray-800 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70 transition-all my-5"
              onClick={() => handleSend()}
            >
              {loading ? <Spinner /> : "Send Email"}
            </button>
          </div>

          <div className="lg:max-w-[45%] w-full flex flex-col gap-2 border rounded-lg p-3">
            {data.map((el, i) => (
              <ListElement
                key={el.id}
                data={el}
                index={i}
                setSelected={setSelected}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
    </motion.div>
  );
}

const ListElement = ({ data, setSelected }) => {
  return (
    <div className="py-4 px-2 border-b flex items-center gap-5 w-full rounded-lg text-xs relative group">
      <IoCloseCircle
        onClick={() => setSelected(data.user)}
        className="text-red-500 text-2xl opacity-0 group-hover:opacity-100 absolute top-[-5px] right-[-5px] transition-all hover:scale-150"
        title="remove user"
      />
      <img
        src={data.profile_photo}
        alt=""
        className="w-8 aspect-square rounded-full border-2 border-gray-700 object-cover"
      />
      <span className="w-52 font-semibold">{data?.username}</span>
      <span className="w-full text-end font-medium underline">
        {data?.date}
      </span>
    </div>
  );
};
