import { useEffect, useState } from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);

  const axiosSecure = useAxiosSecure();

  // Load only members
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        const memberList = res.data.filter((u) => u.role === "member");
        setMembers(memberList);
      })
      .catch((err) => console.error("❌ Error loading members", err));
  }, [axiosSecure]);

  const handleRemove = (email) => {
    axiosSecure
      .patch(`/users/role/${email}`, { role: "user" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Member demoted to user!");
          setMembers((prev) => prev.filter((member) => member.email !== email));
        }
      })
      .catch((err) => {
        console.error("❌ Remove failed", err);
        toast.error("Failed to update role");
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.name || "N/A"}</td>
                <td>{member.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleRemove(member.email)}
                  >
                    Remove Member
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No active members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
