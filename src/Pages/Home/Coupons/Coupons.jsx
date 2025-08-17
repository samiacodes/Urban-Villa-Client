import { FaGift, FaTags, FaCoins } from "react-icons/fa";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch available coupons
  useEffect(() => {
    axiosSecure
      .get("/coupons")
      .then((res) => {
        const availableCoupons = res.data.filter((c) => c.available);
        setCoupons(availableCoupons);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch coupons:", err);
      });
  }, [axiosSecure]);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16"
          data-aos="fade-down"
        >
           Special Offers Just for You
        </h2>
        {coupons.length === 0 ? (
          <p className="text-center text-gray-500">
            No active coupons available.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {coupons.map((offer, idx) => (
              <div
                key={offer._id}
                className={`rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-blue-50`}
                data-aos={idx % 2 === 0 ? "fade-up" : "zoom-in"}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon based on index for variety */}
                  {idx % 3 === 0 ? (
                    <FaGift className="text-5xl text-primary mb-3" />
                  ) : idx % 3 === 1 ? (
                    <FaTags className="text-5xl text-primary mb-3" />
                  ) : (
                    <FaCoins className="text-5xl text-primary mb-3" />
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {offer.code} - {offer.discount}% OFF
                  </h3>
                  <p className="text-gray-600">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Coupons;
