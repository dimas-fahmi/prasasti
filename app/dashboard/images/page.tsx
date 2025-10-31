import { Metadata } from "next";
import React from "react";
import ImagesPageIndex from "./ImagesPageIndex";

export const metadata: Metadata = {
  title: "Media | Prasasti",
};

const ImagesPage = () => {
  return (
    <div className="dashboard-padding">
      <ImagesPageIndex />
    </div>
  );
};

export default ImagesPage;
