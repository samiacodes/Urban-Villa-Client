import { useEffect } from "react";
import { useLocation } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const routes = {
      "/": "Home - UrbanVilla",
      "/apertment": "ApartMents - UrbanVilla",
      "/login": "Login - UrbanVilla",
      "/register": "Register - UrbanVilla",
      "/dashboard": "Dashboard - UrbanVilla",
      "/dashboard/profile": "My Profile - UrbanVilla",
      "/dashboard/announcements": "Announcements - UrbanVilla",
      "/dashboard/admin-profile": "Admin Profile - UrbanVilla",
      "/dashboard/manage-members": "Manage Members - UrbanVilla",
      "/dashboard/make-announcement": "Announcements - UrbanVilla",
      "/dashboard/agreement-requests": "Agreement Requests - UrbanVilla",
      "/dashboard/manage-coupons": "Manage Coupons - UrbanVilla",
      "/dashboard/make-payment": "Make Payment - UrbanVilla",
      "/dashboard/payment-history": "Payment History - UrbanVilla",
      "/apartment": "Apartments - UrbanVilla",
      "/about": "About Building - UrbanVilla",
      "/contact": "Contact - UrbanVilla",
    };

    document.title = routes[path] || "UrbanVilla";
  }, [location]);

  return null;
};

export default DynamicTitle;
