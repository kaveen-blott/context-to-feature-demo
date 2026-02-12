"use client";

import { Invoice } from "@/lib/types/invoice";
import { formatDueDate } from "@/lib/utils/date";
import { formatCurrency } from "@/lib/utils/currency";
import { StatusBadge } from "@/components/status-badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link href={`/invoices/${invoice.id}`}>
      <div className="group relative flex h-[72px] w-full cursor-pointer items-center justify-between gap-6 rounded-lg bg-card px-6 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] transition-all hover:border-l-[3px] hover:border-primary hover:pl-[21px] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]">
        {/* Invoice ID */}
        <div className="flex items-center gap-1">
          <span className="text-[15px] font-bold leading-[15px] tracking-tight text-invoice-muted-blue">
            #
          </span>
          <span className="text-[15px] font-bold leading-[15px] tracking-tight text-foreground">
            {invoice.id}
          </span>
        </div>

        {/* Due Date */}
        <div className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] text-muted-foreground">
          {formatDueDate(invoice.paymentDue)}
        </div>

        {/* Client Name */}
        <div className="text-[13px] font-medium leading-[15px] tracking-[-0.1px] text-invoice-muted-blue">
          {invoice.clientName}
        </div>

        {/* Amount */}
        <div className="text-[15px] font-bold leading-[15px] tracking-tight text-foreground">
          {formatCurrency(invoice.total)}
        </div>

        {/* Status Badge */}
        <StatusBadge status={invoice.status} />

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-primary" />
      </div>
    </Link>
  );
}
