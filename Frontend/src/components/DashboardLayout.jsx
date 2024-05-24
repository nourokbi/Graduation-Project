import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="container ">
      <div className="dashboard-container">
        <DashboardNavbar />
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
import React from 'react'

