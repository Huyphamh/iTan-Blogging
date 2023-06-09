import React from "react";

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <div className="display: flex justify-between">
      <div className="mb-10">
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      
    </div>
  );
};

export default DashboardHeading;
