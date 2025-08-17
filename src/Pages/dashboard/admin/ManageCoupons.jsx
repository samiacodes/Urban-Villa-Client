import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaTags } from "react-icons/fa";
import Loader from "../../Shared/Loader/Loader";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch all coupons
  useEffect(() => {
    axiosSecure
      .get("/coupons")
      .then((res) => {
        setCoupons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch coupons:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // ✅ Handle new coupon form submission
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/coupons", {
        ...data,
        available: true, 
      });
      if (res.data.insertedId) {
        toast.success("✅ Coupon added!");
        reset();
        setCoupons((prev) => [res.data.newCoupon, ...prev]);
      }
    } catch (err) {
      console.error("❌ Failed to add coupon:", err);
    }
  };

  // ✅ Toggle availability
  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/coupons/${id}`, {
        available: !currentStatus,
      });

      if (res.data.modifiedCount > 0) {
        setCoupons((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, available: !currentStatus } : c
          )
        );

        toast.success(
          !currentStatus
            ? "✅ Coupon marked as available!"
            : "❌ Coupon marked as unavailable!"
        );
      }
    } catch (err) {
      console.error("❌ Failed to update availability", err);
      toast.error("Failed to update availability");
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex gap-3 items-center">
        {" "}
        Manage Coupons <FaTags />
      </h1>

      {/* Coupon Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          {...register("code", { required: true })}
          placeholder="Coupon Code"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("discount", { required: true })}
          placeholder="Discount %"
          type="number"
          className="w-full border p-2 rounded"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Coupon Description"
          className="w-full border p-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
        >
          Add Coupon
        </button>
      </form>

      {/* Coupon Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full min-w-[700px] border border-primary shadow rounded-md">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Discount %</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Available</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {coupons.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-secondary/10 transition-all duration-300"
                >
                  <td className="p-2 border text-center">{c.code}</td>
                  <td className="p-2 border text-center">{c.discount}</td>
                  <td className="p-2 border">{c.description}</td>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={c.available}
                      onChange={() => handleToggle(c._id, c.available)}
                    />
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

export default ManageCoupons;
