import { Separator } from "@/src/ui/shadcn/components/ui/separator";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { LogOut, LucideIcon, UserCircle } from "lucide-react";
import Link from "next/link";

const NavLinkItem = ({
  icon: Icon,
  title,
  href,
  className,
}: {
  icon: LucideIcon;
  title: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 opacity-70 hover:opacity-100 hover:bg-muted py-2 px-4 rounded-md",
        className
      )}
    >
      {/* Icon */}
      <Icon className="w-5 h-5" />

      {/* Title */}
      <span className="text-sm">{title}</span>
    </Link>
  );
};

const MetadataCardPopoverMenu = () => {
  return (
    <div className="space-y-2">
      <NavLinkItem icon={UserCircle} title="Profile" href="/dashboard" />
      <Separator />
      <NavLinkItem
        icon={LogOut}
        title="Sign Out"
        href="/auth/signout"
        className="text-destructive dark:hover:bg-destructive/10 hover:bg-destructive-background dark:hover:text-destructive hover:text-destructive-foreground"
      />
    </div>
  );
};

export default MetadataCardPopoverMenu;
