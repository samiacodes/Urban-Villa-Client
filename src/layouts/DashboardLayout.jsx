import { Outlet, NavLink } from "react-router";
import { useState } from "react";
import Logo from "../Pages/Shared/Logo/Logo";
import useRole from "../hooks/useRole";
import MoonLoaderComponent from "../Pages/Shared/Loader/MoonLoaderComponent";
import DynamicTitle from "../Pages/Shared/pageTitle/DynamicTitle";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <MoonLoaderComponent />;
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-white text-primary font-semibold px-4 py-2 rounded-md"
      : "hover:bg-white hover:text-primary px-4 py-2 rounded-md transition";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center bg-gray-800 text-white p-4">
        <Logo />
        <button onClick={() => setOpen(!open)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-800 text-white p-4 space-y-4`}
      >
        <div className="hidden md:flex">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard/announcements" className={navLinkClass}>
            Announcements
          </NavLink>

          {(role === "member" || role === "user") && (
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              My Profile
            </NavLink>
          )}

          {role === "member" && (
            <>
              <NavLink to="/dashboard/make-payment" className={navLinkClass}>
                Make Payment
              </NavLink>
              <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                Payment History
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/admin-profile" className={navLinkClass}>
                Admin Profile
              </NavLink>
              <NavLink to="/dashboard/manage-members" className={navLinkClass}>
                Manage Members
              </NavLink>
              <NavLink
                to="/dashboard/make-announcement"
                className={navLinkClass}
              >
                Make Announcement
              </NavLink>
              <NavLink
                to="/dashboard/agreement-requests"
                className={navLinkClass}
              >
                Agreement Requests
              </NavLink>
              <NavLink to="/dashboard/manage-coupons" className={navLinkClass}>
                Manage Coupons
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100">
        <DynamicTitle />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
