import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCouch, FaLeaf, FaUsers } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          data-aos="fade-down"
        >
          Discover <span className="text-secondary">Urban Heights</span>
        </h2>
        <p
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
          data-aos="fade-up"
        >
          Urban Heights is not just a building — it's a lifestyle. Our
          apartments offer modern architecture, scenic views, and world-class
          facilities to make your life comfortable and convenient.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div
          className="bg-white/70 backdrop-blur-lg border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-right"
        >
          <div className="text-primary text-4xl mb-4">
            <FaCouch />
          </div>
          <h4 className="text-xl font-semibold mb-2 text-primary">
            Premium Facilities
          </h4>
          <p className="text-gray-700 text-sm">
            From rooftop gardens to 24/7 security, we provide all the modern
            facilities you deserve.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="bg-white/70 backdrop-blur-lg border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="zoom-in"
        >
          <div className="text-secondary text-4xl mb-4">
            <FaLeaf />
          </div>
          <h4 className="text-xl font-semibold mb-2 text-secondary">
            Sustainable Design
          </h4>
          <p className="text-gray-700 text-sm">
            Eco-friendly materials and energy-efficient systems to support green
            living.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-white/70 backdrop-blur-lg border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-left"
        >
          <div className="text-primary text-4xl mb-4">
            <FaUsers />
          </div>
          <h4 className="text-xl font-semibold mb-2 text-primary">
            Community Spaces
          </h4>
          <p className="text-gray-700 text-sm">
            Community halls, gyms, and play zones to bring residents together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
