"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { InvoiceCard } from "@/components/invoice-card";
import { FilterDropdown } from "@/components/filter-dropdown";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockInvoices } from "@/lib/data/mock-invoices";
import { InvoiceStatus } from "@/lib/types/invoice";

export default function InvoicesPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);

  // Filter invoices based on selected statuses
  const filteredInvoices = useMemo(() => {
    if (selectedStatuses.length === 0) {
      return mockInvoices;
    }
    return mockInvoices.filter((invoice) =>
      selectedStatuses.includes(invoice.status)
    );
  }, [selectedStatuses]);

  // Handle status toggle
  const handleStatusToggle = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Generate subtitle based on filters
  const subtitle = useMemo(() => {
    if (filteredInvoices.length === 0) {
      return "No invoices";
    }

    if (selectedStatuses.length === 1) {
      const statusLabel = selectedStatuses[0];
      return `There ${filteredInvoices.length === 1 ? "is" : "are"} ${
        filteredInvoices.length
      } ${statusLabel} ${filteredInvoices.length === 1 ? "invoice" : "invoices"}`;
    }

    return `There ${filteredInvoices.length === 1 ? "is" : "are"} ${
      filteredInvoices.length
    } total ${filteredInvoices.length === 1 ? "invoice" : "invoices"}`;
  }, [filteredInvoices.length, selectedStatuses]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content area */}
      <main className="ml-[103px] flex-1 bg-background px-16 py-[72px]">
        <div className="mx-auto max-w-[730px]">
          {/* Header */}
          <div className="mb-16 flex items-center justify-between">
            {/* Title and subtitle */}
            <div>
              <h1 className="text-4xl font-bold leading-none tracking-tight text-foreground">
                Invoices
              </h1>
              <p className="mt-2 text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-muted-foreground">
                {subtitle}
              </p>
            </div>

            {/* Filter and New Invoice button */}
            <div className="flex items-center gap-10">
              <FilterDropdown
                selectedStatuses={selectedStatuses}
                onStatusToggle={handleStatusToggle}
              />

              <Button
                className="h-12 gap-4 rounded-3xl bg-primary px-4 pr-4 text-[15px] font-bold leading-[15px] tracking-tight text-primary-foreground transition-colors hover:bg-accent"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Plus className="h-[10px] w-[10px] text-primary" />
                </div>
                <span>New Invoice</span>
              </Button>
            </div>
          </div>

          {/* Invoice list or empty state */}
          {filteredInvoices.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
