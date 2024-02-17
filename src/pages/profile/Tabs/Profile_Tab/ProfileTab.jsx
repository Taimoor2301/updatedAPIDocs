import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useUserData } from "../../../../utils/useUserData";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../../../utils/useAxios";
import { DataTemplate } from "../../../../constants/dataTemplate";
import { Country, State, City } from "country-state-city";
import { useAuthStore } from "../../../../store/auth";
import Spinner from "../../../../components/Spinner";

const ProfileTab = () => {
  const [data, setData] = useState(DataTemplate);
  const { userData, loading, error } = useUserData();
  const [updating, setUpdating] = useState(false);
  const api = useAxios();

  const { allUserData } = useAuthStore();

  useEffect(() => {
    if (!loading && !error && userData) {
      const newData = {};
      for (const key in data) {
        newData[key] = { ...data[key], value: userData[key] || "" };
      }
      setData(newData);
    }
  }, [userData, loading, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
  };

  const handleCountryChange = (e) => {
	const { name, value } = e.target;
  
	// Set state and city values to 'Select' when the country is changed
	setData((prev) => ({
	  ...prev,
	  state: { ...prev.state, value: "Select" },
	  city: { ...prev.city, value: "Select" },
	  [name]: { ...prev[name], value },
	}));
  };
  
  
  const handleStateChange=(e) => {
	const { name, value } = e.target;
	// Set state and city values to 'Select' when the country is changed
	setData((prev) => ({
	  ...prev,
	  city: { ...prev.city, value: "Select" },
	  [name]: { ...prev[name], value },
	}));
  };

  const handleUpdate = async () => {
    const newData = {};
    for (const key in data) {
      newData[key] = data[key].value;
    }

    try {
      setUpdating(true);
      await api.put("profile/", newData);
      toast.success("Successfully updated");
      setUpdating(false);
    } catch (error) {
      toast.error(`${error}`);
      setUpdating(false);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <h1 className='text-2xl font-poppins tracking-wide col-span-full text-center py-6 font-bold flex flex-col items-center justify-center gap-1'>
        Profile
        <span className='text-sm font-semibold'>{allUserData.username}</span>
      </h1>

      {loading ? (
        <div className='col-span-full'>
          <Spinner />
        </div>
      ) : (
        Object.entries(data).map(([fieldName, field]) => (
          <DataField
            key={fieldName}
            {...field}
            country={data.country}
            state={data.state}
            onChange={handleChange}
            onCountryChange={handleCountryChange}
            handleStateChange={handleStateChange}
          />
        ))
      )}

      {!loading && (
        <button
          disabled={updating}
          className='text-lg bg-gray-800 hover:bg-primary disabled:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-80 text-white col-span-1 font-poppins py-1.5 rounded-md transition-all duration-500 group flex items-center gap-2 justify-center'
          onClick={handleUpdate}>
          {updating ? <Spinner /> : "Update"}
          {!updating && <FaArrowRight className='group-hover:translate-x-1 transition-all' />}
        </button>
      )}
    </div>
  );
};

const DataField = ({ name = "", value = "", onChange, onCountryChange, type = "text", label, country, state,handleStateChange }) => {
  if (type === "select") {
    const countries = Country.getAllCountries();

    if (label === "State") {
      const userCountry = countries.find((item) => item.name === country.value);
      const states = State.getStatesOfCountry(userCountry?.isoCode);

      return (
        <div className='flex flex-col gap-1 font-poppins col-span-1'>
          <label className='text-gray-500 font-medium'>{label}</label>
          <select
            className='p-2 rounded-md border hover:border-primary focus:border-primary focus:outline-none'
            name={name}
            value={value}
            onChange={handleStateChange}>
            <option value={value}>{value}</option>
            {states.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      );
    }

    if (label === "City") {
      const userCountry = countries.find((item) => item.name === country.value);
      const userState = State.getStatesOfCountry(userCountry?.isoCode).find((item) => item.name === state.value);
      const citiesList = City.getCitiesOfState(userState?.countryCode, userState?.isoCode) || [];

      return (
        <div className='flex flex-col gap-1 font-poppins col-span-1'>
          <label className='text-gray-500 font-medium'>{label}</label>
          <select
            className='p-2 rounded-md border hover:border-primary focus:border-primary focus:outline-none'
            name={name}
            value={value}
            onChange={onChange}>
            <option value={value}>{value}</option>
            {citiesList.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className='flex flex-col gap-1 font-poppins col-span-1'>
        <label className='text-gray-500 font-medium'>{label}</label>
        <select
          className='p-2 rounded-md border hover:border-primary focus:border-primary focus:outline-none'
          name={name}
          value={value}
          onChange={(e) => {
            onCountryChange(e); // Call the onCountryChange callback
            onChange(e);
          }}>
          <option value={value}>{value}</option>
          {countries.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-1 font-poppins col-span-1'>
      <label className='text-gray-500 font-medium'>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='p-2 rounded-md border hover:border-primary focus:border-primary focus:outline-none'
      />
    </div>
  );
};

export default ProfileTab;
