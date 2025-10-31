import { Metadata } from "next";
import React from "react";
import DashboardRecentNotes from "./section/DashboardRecentNotes";
import DashboardArtifacts from "./section/DashboardArtifacts";

export const metadata: Metadata = {
  title: "Dashboard | Prasasti",
};

const DashboardPage = () => {
  return (
    <div>
      {/* Recent Notes Card */}
      <DashboardRecentNotes />

      {/* All Artifacts */}
      <DashboardArtifacts />
    </div>
  );
};

export default DashboardPage;
