import { useEffect, useState } from "react";
import axios from "axios";
import { MdCampaign, MdOutlineCampaign } from "react-icons/md";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/announcements`).then((res) => {
      setAnnouncements(res.data);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h1 className="text-2xl text-secondary font-bold mb-4 flex gap-3 items-center">Announcements <MdOutlineCampaign className="text-4xl"/></h1>
      <ul className="space-y-3">
        {announcements.length === 0 && <p>No announcements yet.</p>}
        {announcements.map((a, index) => (
          <li key={index} className="border-l-4 border-secondary pl-4">
            <h3 className="font-semibold text-lg">{a.title}</h3>
            <p>{a.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(a.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
