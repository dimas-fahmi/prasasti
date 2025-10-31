"use client";

import { useGetMetadata } from "@/src/db/idb/hooks/useGetMetadata";
import { useDashboardStore } from "@/src/lib/stores/dashboardStore";
import DashboardSidebar from "@/src/ui/components/dashboard/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/ui/shadcn/components/ui/resizable";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const { setMainWidth } = useDashboardStore();
  const mainRef = useRef<HTMLElement>(null);

  const { data: metadata, isPending: isLoadingMetadata } = useGetMetadata();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingMetadata) return;

    if (!metadata) {
      router.push("/");
    }
  }, [metadata, isLoadingMetadata, router]);

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
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-dvh overflow-visible!"
    >
      {/* Sidebar */}
      <ResizablePanel
        className="hidden md:block overflow-visible!"
        minSize={20}
        maxSize={30}
        defaultSize={20}
      >
        <aside className="sticky top-2 ">
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
