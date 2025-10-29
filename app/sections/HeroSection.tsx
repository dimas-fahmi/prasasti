import { Button } from "@/src/ui/shadcn/components/ui/button";
import { Import, Lock, LockOpen } from "lucide-react";
import React from "react";

const LandingHeroSection = () => {
  return (
    <section className="min-h-dvh p-4 md:p-16 lg:p-24 max-w-7xl mx-auto flex items-center justify-between">
      {/* Content */}
      <div className="max-w-md">
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
          <Button className="group/button" size={"lg"}>
            <Lock className="group-hover/button:block hidden" />
            <LockOpen className="group-hover/button:hidden block" />
            Continue
          </Button>
          <Button variant={"outline"} size={"lg"}>
            <Import />
            Import Prasasti
          </Button>
        </div>
      </div>

      {/* Illustration */}
      <div></div>
    </section>
  );
};

export default LandingHeroSection;
