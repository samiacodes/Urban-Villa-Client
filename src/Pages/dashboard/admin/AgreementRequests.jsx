import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../Shared/Loader/Loader";
import { FaEnvelopeOpenText } from "react-icons/fa";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
  const fetchRequests = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/agreements/pending`
    );
    setRequests(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

const handleAccept = async (id, email, name) => {
  try {
    const res = await axiosSecure.patch(`/agreements/accept/${id}`, {
      userEmail: email,
      userName: name,
    });

    if (res.data?.userResult?.modifiedCount > 0) {
      toast.success(`${name} is now a Member! 🎉`);
      fetchRequests();
      
    } else {
      toast.error("Failed to promote user.");
    }
  } catch (err) {
    toast.error("Something went wrong.");
    console.error("❌ Promote failed:", err);
  }
};

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/agreements/reject/${id}`
      );

      toast.success("Agreement rejected and removed successfully");

      fetchRequests(); 
    } catch (err) {
      console.error("❌ Reject failed:", err);
      toast.error("Failed to reject agreement");
    }
  };


  if (loading)
    return <Loader/>;

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 flex gap-2 items-center">
        <FaEnvelopeOpenText /> Agreement Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">No pending requests found.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full min-w-[700px] border border-primary shadow rounded-md">
            <thead className="bg-primary text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Floor</th>
                <th>Block</th>
                <th>Apartment No</th>
                <th>Rent</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-secondary/10 transition-all duration-300"
                >
                  <td>{req.userName}</td>
                  <td>{req.userEmail}</td>
                  <td>{req.floor}</td>
                  <td>{req.block}</td>
                  <td>{req.apartmentNo}</td>
                  <td>{req.rent}</td>
                  <td>{new Date(req.date).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      className="bg-secondary text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleAccept(req._id, req.userEmail, req.userName)
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-primary text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgreementRequests;
