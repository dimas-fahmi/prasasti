import {
  ArchiveIcon,
  ImageIcon,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  Trash,
  VideoIcon,
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
        title="My Images"
        icon={ImageIcon}
        href="/dashboard/images"
      />
      <NavigationItem
        title="My Videos"
        icon={VideoIcon}
        href="/dashboard/videos"
      />

      <NavigationItem
        title="Archive"
        icon={ArchiveIcon}
        href="/dashboard/archive"
      />
      <NavigationItem title="Trash" icon={Trash} href="/dashboard/trash" />
      <NavigationItem
        title="Settings"
        icon={Settings}
        href="/dashboard/settings"
      />
    </div>
  );
};

export default Navigations;
