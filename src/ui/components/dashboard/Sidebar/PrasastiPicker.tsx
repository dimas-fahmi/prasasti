import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "@/src/ui/shadcn/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";

const PrasastiPicker = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full bg-transparent! ">{`Jane Doe's Prasasti`}</SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Prasasti</SelectLabel>
            <SelectItem value="jd">{`Jane Doe's Prasasti`}</SelectItem>
            <SelectSeparator />

            {/* Create New Prasasti */}
            <SelectItem value="jd">
              <Plus /> New Prasasti
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PrasastiPicker;
