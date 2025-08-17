import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SendNoticeButton = () => {
  const axiosSecure = useAxiosSecure();

  const sendNotices = async () => {
    try {
      const res = await axiosSecure.patch("/notices/send");
      toast.success(res.data.message || "Notices sent successfully!");
    } catch (err) {
      console.error("❌ Error sending notices:", err);
      toast.error("Failed to send notices");
    }
  };

  return (
    <button
      onClick={sendNotices}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
    >
      🔔 Check Rent & Send Notices
    </button>
  );
};

export default SendNoticeButton;
