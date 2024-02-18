import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAxios from "../../../utils/useAxios";

export default function AddNewUser({ closeModal, setChanged }) {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const roles = ["Select Role", "Appraiser", "Agent", "Buyer"];
  const [role, setRole] = useState(roles[0]);
  const { id } = useParams();
  const [savingUser, setSavingUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const api = useAxios();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  async function searchUser(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setNotFound(false);
      const res = await api.post(`/authorized_users/modify/0/`, {
        username,
      });

      if (res.data.length > 0) {
        setData(res.data);
      } else {
        setData([]);
        setNotFound(true);
      }
    } catch (error) {
      toast.error("something went wrong.");
      console.log(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  async function savsUser(user_id) {
    setErrorMsg(null);
    if (role === roles[0]) {
      return setErrorMsg("please select role for this user");
    } else {
      setSavingUser(true);

      try {
        await api.post(`/authorized_users/create/`, {
          user_id,
          property_id: id,
          role,
        });
        closeModal(false);
        setChanged((p) => !p);
        toast.success("user added");
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          setErrorMsg("user already exists");
        } else {
          setErrorMsg("something went wrong");
        }
      } finally {
        setSavingUser(false);
      }
    }
  }

  return (
    <div
      className="bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99998]"
      onClick={() => closeModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md py-8 gap-10 relative"
      >
        <IoCloseCircleOutline
          onClick={() => closeModal(false)}
          className="absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300"
        />

        <h1 className="text-xl font-bold text-center">Authorize New User</h1>

        <form className="flex gap-2 my-10" onSubmit={searchUser}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter User Name"
            className="p-2 flex-1 rounded-md border border-gray-700 bg-gray-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="text-white font-medium bg-gray-800 hover:bg-primary disabled:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-80 px-4 py-2 rounded text-lg transition-all w-[10rem] max-h-full"
          >
            {loading ? <Spinner /> : "Search"}
          </button>
        </form>

        {/* results  */}
        <div className="flex flex-col">
          {notFound && (
            <div className="h-full flex items-center text-center text-xl font-bold">
              No user found with username {username}
            </div>
          )}

          {data.map((item) => (
            <div
              key={item.user_id}
              className="font-semibold px-3 bg-zinc-100 flex flex-col gap-10 border-2 border-gray-800 rounded-lg py-2"
            >
              <span className="text-2xl font-bold text-center pt-10">
                User: {item.username}
              </span>
              <select
                className="bg-gray-800 text-white p-2 rounded-md text-center"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {errorMsg && (
                <div className="text-lg text-red-500 border-2 border-red-500 rounded-lg py-2 text-center">
                  {" "}
                  {errorMsg}{" "}
                </div>
              )}

              <button
                onClick={() => savsUser(item.user_id)}
                disabled={savingUser}
                className="border-2 border-gray-800 bg-gray-800 text-white rounded-md py-2 font-semibold hover:bg-primary transition-all disabled:cursor-not-allowed disabled:opacity-90"
              >
                {savingUser ? <Spinner /> : "Save"}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
