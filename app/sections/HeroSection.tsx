"use client";

import { useGetMetadata } from "@/src/db/idb/hooks/useGetMetadata";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { Import, Lock, LockOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingHeroSection = () => {
  const { data: metadata, isLoading: isLoadingMetadata } = useGetMetadata();
  const router = useRouter();

  return (
    <section className="min-h-dvh p-4 md:p-16 lg:p-24 max-w-7xl mx-auto flex items-center justify-between">
      {/* Content */}
      <div className="max-w-md md:pb-16">
        {/* Logo */}
        <Image
          width={180}
          height={40}
          src={"/assets/logos/svg/horizontal.svg"}
          alt="Prasasti Logo"
          className="mb-6 hidden md:block"
        />

        <h1 className="font-header font-bold text-4xl mb-4">
          Write. Preserve. Own Forever.
        </h1>
        <p className="text-sm font-light">
          Prasasti is an offline-first note app designed for permanence and
          privacy. Your ideas live inside your device — never on a server.
          Create Artifacts, inscribe your thoughts, and keep them safe in your
          own Prasasti. Download, import, and preserve your knowledge — just
          like an ancient inscription carved in stone.
        </p>

        <div className="mt-6 flex gap-2">
          <Button
            className="group/button"
            size={"lg"}
            disabled={isLoadingMetadata}
            onClick={() => {
              if (isLoadingMetadata) return;

              if (metadata) {
                router.push("/dashboard");
              } else {
                router.push("/new");
              }
            }}
          >
            <Lock className="group-hover/button:block hidden" />
            <LockOpen className="group-hover/button:hidden block" />
            Continue
          </Button>
          <Button
            variant={"outline"}
            size={"lg"}
            disabled={isLoadingMetadata || !!metadata}
          >
            <Import />
            Import Prasasti
          </Button>
        </div>
      </div>

      {/* Illustration */}
      <div>
        <Image
          width={380}
          height={380}
          src={"/assets/arts/svg/hero-art-01.svg"}
          alt="Inscription Art"
        />
      </div>
    </section>
  );
};

export default LandingHeroSection;
