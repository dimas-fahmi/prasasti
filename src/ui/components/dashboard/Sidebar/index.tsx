import Navigations from "./Navigations";
import MetadataCard from "./MetadataCard";
import NewNoteButton from "./NewNoteButton";
import SidebarRecentNotes from "./SidebarRecentNotes";

const DashboardSidebar = () => {
  return (
    <div className="py-6 sticky px-4 space-y-6">
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

        <div className="space-y-2">
          {/* Collection - Recent Note */}
          <SidebarRecentNotes />

          {/* New Note Button */}
          <NewNoteButton />
        </div>
      </section>
    </div>
  );
};

export default DashboardSidebar;
