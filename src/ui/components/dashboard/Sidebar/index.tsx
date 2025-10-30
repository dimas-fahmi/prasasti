import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Navigations from "./Navigations";
import MetadataCard from "./MetadataCard";

const DashboardSidebar = () => {
  const router = useRouter();

  const createNewArtifact = () => {
    router.push(`/dashboard/artifacts/${crypto.randomUUID()}`);
  };

  return (
    <div className="py-6 px-4 space-y-6">
      {/* Uptop Section */}
      <section id="dashboard-sidebar-uptop" className="space-y-6">
        {/* Metadata */}
        <MetadataCard />
      </section>

      {/* Navigation Section */}
      <section>
        <Navigations />
      </section>

      {/* Prasastis */}
      <section className="space-y-4">
        <h1 className="text-xs font-semibold uppercase opacity-80">
          Recent Artifacts
        </h1>

        {/* New Artifact Button */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded-md w-full opacity-70"
          onClick={createNewArtifact}
        >
          <Plus className="w-4 h-4" /> New Artifact
        </button>
      </section>
    </div>
  );
};

export default DashboardSidebar;
