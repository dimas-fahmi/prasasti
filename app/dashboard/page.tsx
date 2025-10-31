import { Metadata } from "next";
import React from "react";
import DashboardRecentNotes from "./section/DashboardRecentNotes";
import DashboardArtifacts from "./section/DashboardArtifacts";

export const metadata: Metadata = {
  title: "Dashboard | Prasasti",
};

const DashboardPage = () => {
  return (
    <div className="dashboard-padding space-y-6">
      {/* Header */}
      <header>
        <h1 className="dashboard-heading">Recent Notes</h1>
      </header>

      {/* Recent Notes Card */}
      <DashboardRecentNotes />

      {/* All Artifacts */}
      <DashboardArtifacts />
    </div>
  );
};

export default DashboardPage;
