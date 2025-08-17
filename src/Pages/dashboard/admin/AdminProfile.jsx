import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SendNoticeButton from "../../../components/Admin/SendNoticeButton";
import Loader from "../../Shared/Loader/Loader";
import { FaUserCheck } from "react-icons/fa";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loader/>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
      <h2 className="text-2xl font-semibold mb-4 flex gap-3 items-center"><FaUserCheck className="text-3xl"/> Admin Profile</h2>
      <img
        src={user?.photoURL || "https://i.ibb.co/2K9M3pZ/default-avatar.png"}
        alt="Admin Avatar"
        className="w-20 h-20 rounded-full mb-2"
      />
      <p>
        <strong>Name:</strong> {user?.displayName || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>

      <hr className="my-4" />

      <h3 className="text-xl font-semibold">📊 Stats</h3>
      <p>
        <strong>Total Rooms:</strong> {stats.totalRooms}
      </p>
      <p>
        <strong>Available Rooms (%):</strong> {stats.availablePercentage}%
      </p>
      <p>
        <strong>Unavailable Rooms (%):</strong> {stats.agreedPercentage}%
      </p>
      <p>
        <strong>Total Users:</strong> {stats.totalUsers}
      </p>
      <p>
        <strong>Total Members:</strong> {stats.totalMembers}
      </p>
      <SendNoticeButton />
    </div>
  );
};

export default AdminProfile;
