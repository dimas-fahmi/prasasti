import Navigations from "./Navigations";
import MetadataCard from "./MetadataCard";
import NewNoteButton from "./NewNoteButton";

const DashboardSidebar = () => {
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
          Recent Notes
        </h1>

        {/* New Note Button */}
        <NewNoteButton />
      </section>
    </div>
  );
};

export default DashboardSidebar;
