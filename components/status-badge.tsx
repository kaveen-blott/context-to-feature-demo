import { InvoiceStatus } from "@/lib/types/invoice";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    paid: {
      label: "Paid",
      dotColor: "bg-invoice-green",
      textColor: "text-invoice-green",
      bgColor: "bg-invoice-green/[0.06]",
    },
    pending: {
      label: "Pending",
      dotColor: "bg-invoice-orange",
      textColor: "text-invoice-orange",
      bgColor: "bg-invoice-orange/[0.06]",
    },
    draft: {
      label: "Draft",
      dotColor: "bg-invoice-draft-light dark:bg-invoice-draft-dark",
      textColor: "text-invoice-draft-light dark:text-invoice-draft-dark",
      bgColor: "bg-invoice-draft-light/[0.06] dark:bg-invoice-draft-dark/[0.06]",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "flex h-10 min-w-[104px] items-center justify-center gap-2 rounded-[6px] px-4",
        config.bgColor
      )}
    >
      <div className={cn("h-2 w-2 rounded-full", config.dotColor)} />
      <span
        className={cn(
          "text-[15px] font-bold leading-[15px] tracking-tight",
          config.textColor
        )}
      >
        {config.label}
      </span>
    </div>
  );
}
