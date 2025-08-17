import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/authentication/Login/Login";
import Register from "../Pages/authentication/Login/register/Register";
import Apartments from "../Pages/Apartments/Apartments";
import Error404 from "../Pages/ErrorPage/Error404";
import PrivateRoute from "../components/routes/PrivateRoute";
import MemberRoute from "../components/routes/MemberRoute";
import AdminRoute from "../components/routes/AdminRoute";

import DashboardLayout from "../layouts/DashboardLayout";

// Common dashboard pages
import Profile from "../Pages/dashboard/Profile";
import Announcements from "../Pages/dashboard/Announcements";

// Member-only pages
import MakePayment from "../Pages/dashboard/member/MakePayment";
import PaymentHistory from "../Pages/dashboard/member/PaymentHistory";

// Admin-only pages
import AdminProfile from "../Pages/dashboard/admin/AdminProfile";
import ManageMembers from "../Pages/dashboard/admin/ManageMembers";
import MakeAnnouncement from "../Pages/dashboard/admin/MakeAnnouncement";
import AgreementRequests from "../Pages/dashboard/admin/AgreementRequests";
import ManageCoupons from "../Pages/dashboard/admin/ManageCoupons";
import SetAdminManually from "../Pages/setAdminManually/SetAdminManually";
import About from "../Pages/Home/About/About";
import Location from "../Pages/Home/Location/Location";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/apertment", Component: Apartments },
      { path: "/about", Component: About },
      { path: "/apertment", Component: Apartments },
      { path: "/contact", Component: Location },
      {
        path: "/admin-setup",
        element: <SetAdminManually />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // -------------------------
      // 🔸 COMMON (user + member + admin)
      { index: true, element: <Announcements /> },
      { path: "profile", index: true, element: <Profile /> },
      { path: "announcements", element: <Announcements /> },

      // -------------------------
      // 🔹 MEMBER ROUTES
      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },

      // -------------------------
      // 🔺 ADMIN ROUTES
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
