import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useLoading } from "../hooks/useLoading";
import MoonLoaderComponent from "../Pages/Shared/Loader/MoonLoaderComponent";
import DynamicTitle from "../Pages/Shared/pageTitle/DynamicTitle";

const RootLayout = () => {
  const { loading } = useLoading();
    return (
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-277px)]">
          <DynamicTitle/>
          {loading && <MoonLoaderComponent />}
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    );
};

export default RootLayout;