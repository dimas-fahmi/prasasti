"use client";

import { useGetMetadata } from "@/src/db/idb/hooks/useGetMetadata";
import { useDashboardStore } from "@/src/lib/stores/dashboardStore";
import DashboardSidebar from "@/src/ui/components/dashboard/Sidebar";
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
    <div className="grid grid-cols-[300px_auto] min-h-dvh">
      <aside className="border-r">
        <div className="sticky top-0">
          <DashboardSidebar />
        </div>
      </aside>
      <main ref={mainRef}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
