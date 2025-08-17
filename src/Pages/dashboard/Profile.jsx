import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router";
import MoonLoaderComponent from "../Shared/Loader/MoonLoaderComponent";

const Profile = () => {
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!roleLoading && role === "admin") {
      navigate("/dashboard/admin-profile");
    }
  }, [role, roleLoading, navigate]);

  useEffect(() => {
    if (user?.email && role !== "admin") {
      axiosSecure
        .get(`/agreements/user/${user.email}`)
        .then((res) => {
          if (res.data) {
            setAgreement(res.data);
          } else {
            setAgreement(null); 
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Failed to load agreement:", err);
          setAgreement(null);
          setLoading(false);
        });
    }
  }, [user, axiosSecure, role]);

  if (roleLoading || loading) {
    return <MoonLoaderComponent/>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div>
        <img
          src={user?.photoURL || "https://i.ibb.co/tPZyGv4X/avatar.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <p>Name: {user?.displayName || "N/A"}</p>
        <p>Email: {user?.email || "N/A"}</p>

        <p>
          Agreement Accept Date:{" "}
          {agreement?.updatedAt ? (
            new Date(agreement.updatedAt).toLocaleDateString()
          ) : (
            <span className="text-gray-400">No agreement yet</span>
          )}
        </p>

        <p>
          Rented Info:{" "}
          {agreement ? (
            <>
              Floor - {agreement.floor}, Block - {agreement.block}, Room -{" "}
              {agreement.apartmentNo}
            </>
          ) : (
            <span className="text-gray-400">No rented room info</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Profile;
