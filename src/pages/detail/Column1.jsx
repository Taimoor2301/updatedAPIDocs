import {
  FaBed,
  FaBath,
  FaParking,
  FaGooglePlus,
  FaAddressBook,
  FaPercentage,
} from "react-icons/fa";
import { GiSwitzerland } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Column1({ data, setData, isAuthorized, propertyId }) {
  const [previousVersions, setPerviousVersions] = useState([]);
  const api = useAxios();

  async function fetchPereviouse() {
    try {
      const res = await api.get(`property_versions/${propertyId}`);
      setPerviousVersions(res.data);
    } catch (error) {
      console.log(error);
      toast.error("error fetching previous versions");
    }
  }

  async function setPrevData(id) {
    try {
      const res = await api.get(`/property_version/${id}`);
      setData(res.data);
      window.scrollTo(0, 0);
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("error fetching previous version");
    }
  }

  useEffect(() => {
    fetchPereviouse();
  }, []);

  return (
    <div className="bg-white rounded-xl flex flex-col gap-3 p-4 col-span-2">
      <div className="rounded-xl overflow-hidden h-[20rem]">
        <img
          className="w-full h-full object-cover object-center"
          src={data.pictures}
          alt=""
        />
      </div>

      <div className="flex justify-between items-center gap-5 text-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold">
          {data.title || "Document Name"}
        </h1>
        <span className="p-2 rounded-md bg-primary  text-sm">
          {data.property_type}
        </span>
      </div>

      <div className="flex items-center gap-4 border-b-2 pb-6 text-gray-700 flex-wrap">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <FaBed className="text-2xl text-primary" /> 4 Bed
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <FaBath className="text-2xl text-primary" /> 4 Bath
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <FaParking className="text-2xl text-primary" /> 4 Parking
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <GiSwitzerland className="text-2xl text-primary" /> 400 sq feet
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <FaGooglePlus className="text-2xl text-primary" /> Google Plus Code:{" "}
          {data.google_plus_code}
        </span>
      </div>

      <iframe
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyC9DCzt7dwG4YXxa2DwzqcwXr-uw7P4zzs&center=${data.latitude},${data.longitude}&zoom=10`}
        width="100%"
        height="450"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="flex gap-2 flex-col border-b-2 pb-5">
        <h1 className="font-bold text-xl text-gray-800">Property Deatils</h1>
        <p className="text-sm text-gray-600 lg:max-w-[80%]">
          {data.description}
        </p>
      </div>

      <h1 className="text-gray-800 font-bold text-xl">Owner Deatils</h1>
      <div className="flex flex-col lg:flex-row gap-5 flex-wrap text-gray-700 items-start lg:items-center">
        <span className="flex items-center justify-center gap-2 text-lg font-semibold">
          <IoPerson className="text-primary" />
          {data.owner_name}
        </span>
        <span className="flex items-center justify-center gap-2 text-lg font-semibold">
          <FaAddressBook className="text-primary" />
          {data.owner_address}
        </span>
        <span className="flex items-center justify-center gap-2 text-lg font-semibold">
          <FaPercentage className="text-primary" />
          {data.owner_percentage}% Owneship
        </span>
      </div>

      {isAuthorized && (
        <div>
          <p className="font-bold text-gray-700 text-xl py-4">Updates</p>

          {previousVersions.length > 0
            ? previousVersions.map((item) => (
                <div
                  className="flex flex-col gap-2 border-b-2 font-semibold items-start px-2 py-5 text-gray-700"
                  key={item.id}
                >
                  <span>Edited by: {item.edited_by}</span>
                  <span>Summary: {item.update_summary}</span>
                  <span>Updated at: {item.updated_at}</span>
                  <button
                    onClick={() => setPrevData(item.id)}
                    className="text-xs text-white font-normal bg-gray-800 rounded p-1"
                  >
                    View Previous Version
                  </button>
                </div>
              ))
            : "No updates to this document yet."}
        </div>
      )}
    </div>
  );
}
