import {
  Amphora,
  LayoutDashboard,
  type LucideIcon,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/ui/shadcn/lib/utils";

const NavigationItem = ({
  title,
  href,
  className,
  icon,
}: {
  title: string;
  href: string;
  className?: string;
  icon: LucideIcon;
}) => {
  const pathname = usePathname();
  const Icon = icon;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-sm opacity-70 p-2 hover:bg-muted rounded-md",
        `${pathname === href ? "bg-muted opacity-100" : ""}`,
        className
      )}
    >
      <Icon className="w-4 h-4" /> <span>{title}</span>
    </Link>
  );
};

const Navigations = () => {
  return (
    <div className="flex flex-col gap-1">
      <NavigationItem
        title="Dashboard"
        icon={LayoutDashboard}
        href="/dashboard"
      />
      <NavigationItem
        title="My Artifacts"
        icon={Amphora}
        href="/dashboard/artifacts"
      />
      <NavigationItem
        title="Search Artifacts"
        icon={Search}
        href="/dashboard/search"
      />
      <NavigationItem title="Trash" icon={Trash} href="/dashboard/trash" />
    </div>
  );
};

export default Navigations;
