"use client";

import { InvoiceStatus } from "@/lib/types/invoice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
  selectedStatuses: InvoiceStatus[];
  onStatusToggle: (status: InvoiceStatus) => void;
}

export function FilterDropdown({
  selectedStatuses,
  onStatusToggle,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const statuses: { value: InvoiceStatus; label: string }[] = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 text-[15px] font-bold leading-[15px] tracking-tight text-foreground transition-colors hover:text-primary">
          <span>Filter by status</span>
          <ChevronDown
            className={`h-4 w-4 text-primary transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 rounded-lg bg-popover p-6 shadow-[0_10px_20px_-15px_rgba(72,84,159,0.25)] dark:shadow-[0_10px_20px_-15px_rgba(0,0,0,0.5)]"
        align="end"
      >
        <div className="flex flex-col gap-4">
          {statuses.map((status) => (
            <div key={status.value} className="flex items-center gap-3">
              <Checkbox
                id={status.value}
                checked={selectedStatuses.includes(status.value)}
                onCheckedChange={() => onStatusToggle(status.value)}
                className="h-4 w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor={status.value}
                className="text-[15px] font-bold leading-[15px] tracking-tight text-foreground cursor-pointer"
              >
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
