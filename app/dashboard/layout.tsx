"use client";

import DashboardSidebar from "@/src/ui/components/dashboard/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/ui/shadcn/components/ui/resizable";
import React from "react";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-dvh">
      {/* Sidebar */}
      <ResizablePanel
        className="hidden md:block"
        minSize={20}
        maxSize={30}
        defaultSize={20}
      >
        <aside>
          <DashboardSidebar />
        </aside>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={80}>
        <main>{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DashboardLayout;
