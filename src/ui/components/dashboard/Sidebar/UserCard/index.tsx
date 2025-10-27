import { Ellipsis } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/ui/shadcn/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/ui/shadcn/components/ui/popover";
import UserCardPopoverMenu from "./UserCardPopoverMenu";

const UserCard = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Avatar & Name */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={
              "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
            }
            alt="Jane Doe's Avatar"
            className="object-cover"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        {/* Name & Username */}
        <div className="">
          <h1 className="text-base font-semibold">Jane Doe</h1>
          <p className="text-xs font-light">jane-doe</p>
        </div>
      </div>

      {/* Popover Button */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">
              <Ellipsis />
            </button>
          </PopoverTrigger>

          <PopoverContent className="p-2">
            <UserCardPopoverMenu />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserCard;
