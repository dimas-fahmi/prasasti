"use client";

import { useDashboardStore } from "@/src/lib/stores/dashboardStore";
import DashboardSidebar from "@/src/ui/components/dashboard/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/ui/shadcn/components/ui/resizable";
import React, { useEffect, useRef } from "react";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const { setMainWidth } = useDashboardStore();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const current = mainRef.current;
    if (!current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMainWidth(entry.contentRect.width);
      }
    });

    observer.observe(current as unknown as Element);

    return () => observer.disconnect();
  }, [setMainWidth]);

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
        <main ref={mainRef}>{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DashboardLayout;
