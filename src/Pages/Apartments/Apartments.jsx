import React, { useState, useEffect } from "react";
import ApartmentCard from "../../components/Apartments/ApartmentCard";
import Pagination from "../../components/Apartments/Pagination";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useApartments from "../../hooks/useApartments";
import MoonLoaderComponent from "../Shared/Loader/MoonLoaderComponent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Apartments = () => {
  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState("5000");
  const [maxRent, setMaxRent] = useState("20000");
  const [searchParams, setSearchParams] = useState({ min: "", max: "" });

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useApartments(
    page,
    searchParams.min,
    searchParams.max
  );

  const apartments = data?.apartments || [];
  const totalPages = data?.totalPages || 1;

  const [rentedList, setRentedList] = useState([]);

  // ✅ Fetch already rented apartments (status: "checked")
  useEffect(() => {
    const fetchRented = async () => {
      try {
        const res = await axiosSecure.get("/agreements/checked");
        const checked = res.data.filter((a) => a.status === "checked");
        setRentedList(
          checked.map(
            (a) => `${a.floor}-${a.block}-${a.apartmentNo}` 
          )
        );
      } catch (err) {
        console.error("Failed to load rented apartments",err);
      }
    };

    fetchRented();
  }, [axiosSecure]);

  // ✅ Add flag isRented to apartment list
  const enrichedApartments = apartments.map((apt) => {
    const uniqueKey = `${apt.floor}-${apt.block}-${apt.apartmentNo}`;
    return {
      ...apt,
      isRented: rentedList.includes(uniqueKey),
    };
  });

  if (isLoading) return <MoonLoaderComponent />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">❌ Failed to load data</p>
    );

  const handleAgreement = async (apartment) => {
    if (!user) {
      toast.warn("Please login first!");
      navigate("/login");
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apartment.floor,
      block: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
      status: "pending",
      date: new Date(),
    };

    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      toast.success("Agreement sent!");
      console.log(res)
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Apartments</h2>

      {/* 🔍 Rent Filter */}
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          type="number"
          placeholder="Min Rent"
          className="input input-bordered w-full max-w-xs"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rent"
          className="input input-bordered w-full max-w-xs"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setPage(1);
            setSearchParams({ min: minRent, max: maxRent });
          }}
        >
          Search
        </button>
      </div>

      {/* 🏢 Apartment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrichedApartments.map((apt) => (
          <ApartmentCard
            key={apt._id}
            apartment={apt}
            onAgree={handleAgreement}
          />
        ))}
      </div>

      {/* 📄 Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Apartments;
