import { Sidebar } from "@/components/sidebar";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { mockInvoices } from "@/lib/data/mock-invoices";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ViewInvoicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewInvoicePage({
  params,
}: ViewInvoicePageProps) {
  const { id } = await params;

  // Look up invoice by ID
  const invoice = mockInvoices.find((inv) => inv.id === id);

  // Handle invoice not found
  if (!invoice) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="ml-[103px] flex-1 bg-background px-16 py-[72px]">
          <div className="mx-auto max-w-[730px]">
            {/* Back navigation */}
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-6 text-[15px] font-bold leading-[15px] tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>

            <div className="flex flex-col items-center justify-center rounded-lg bg-card p-16 text-center shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]">
              <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-foreground">
                Invoice not found
              </h1>
              <p className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-muted-foreground">
                The invoice you are looking for does not exist.
              </p>
              <Link
                href="/"
                className="mt-6 text-[15px] font-bold leading-[15px] tracking-tight text-primary hover:text-primary/90"
              >
                Back to invoices
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Determine action button text based on status
  const actionButtonText =
    invoice.status === "draft" ? "Mark as Pending" : "Mark as Paid";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="ml-[103px] flex-1 bg-background px-16 py-[72px]">
        <div className="mx-auto max-w-[730px]">
          {/* Back navigation */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-6 text-[15px] font-bold leading-[15px] tracking-tight text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>

          {/* Status bar card */}
          <div className="mb-6 flex h-[88px] items-center justify-between rounded-lg bg-card px-8 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-4">
              <span className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-muted-foreground">
                Status
              </span>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex items-center gap-2">
              {/* Edit button - Button 3 style */}
              <Button
                className={cn(
                  "h-12 rounded-3xl bg-[#F9FAFE] px-6 text-[15px] font-bold leading-[15px] tracking-tight text-invoice-muted-blue hover:bg-[#F9FAFE]/80",
                  "dark:bg-invoice-navy-light dark:text-invoice-lavender dark:hover:bg-invoice-navy-light/80",
                )}
              >
                Edit
              </Button>

              {/* Delete button - Button 5 style */}
              <Button
                variant="destructive"
                className="h-12 rounded-3xl px-6 text-[15px] font-bold leading-[15px] tracking-tight"
              >
                Delete
              </Button>

              {/* Mark as Paid/Pending button - Button 2 style (only show if not paid) */}
              {invoice.status !== "paid" && (
                <Button
                  variant="default"
                  className="h-12 rounded-3xl px-6 text-[15px] font-bold leading-[15px] tracking-tight"
                >
                  {actionButtonText}
                </Button>
              )}
            </div>
          </div>

          {/* Invoice details card */}
          <div className="rounded-lg bg-card p-12 shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]">
            {/* Header section */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-[15px] font-bold leading-6 tracking-tight">
                  <span className="text-invoice-muted">#</span>
                  <span className="text-foreground">{invoice.id}</span>
                </h1>
                <p className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                  {invoice.description}
                </p>
              </div>
              <address className="text-right text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue not-italic">
                <div>{invoice.senderAddress.street}</div>
                <div>{invoice.senderAddress.city}</div>
                <div>{invoice.senderAddress.postCode}</div>
                <div>{invoice.senderAddress.country}</div>
              </address>
            </div>

            {/* Details grid */}
            <div className="mb-8 grid grid-cols-3 gap-8">
              {/* Column 1: Invoice Date + Payment Due */}
              <div className="space-y-8">
                <div>
                  <div className="mb-3 text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    Invoice Date
                  </div>
                  <div className="text-[15px] font-bold leading-5 tracking-tight text-foreground">
                    {formatDate(invoice.createdAt)}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    Payment Due
                  </div>
                  <div className="text-[15px] font-bold leading-5 tracking-tight text-foreground">
                    {formatDate(invoice.paymentDue)}
                  </div>
                </div>
              </div>

              {/* Column 2: Bill To */}
              <div>
                <div className="mb-3 text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                  Bill To
                </div>
                <div className="mb-2 text-[15px] font-bold leading-5 tracking-tight text-foreground">
                  {invoice.clientName}
                </div>
                <address className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue not-italic">
                  <div>{invoice.clientAddress.street}</div>
                  <div>{invoice.clientAddress.city}</div>
                  <div>{invoice.clientAddress.postCode}</div>
                  <div>{invoice.clientAddress.country}</div>
                </address>
              </div>

              {/* Column 3: Sent to */}
              <div>
                <div className="mb-3 text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                  Sent to
                </div>
                <div className="text-[15px] font-bold leading-5 tracking-tight text-foreground">
                  {invoice.clientEmail}
                </div>
              </div>
            </div>

            {/* Items table and Amount Due footer */}
            <div className="overflow-hidden rounded-lg">
              {/* Items table */}
              <div className="bg-[#F9FAFE] p-8 dark:bg-invoice-navy">
                {/* Column headers */}
                <div className="mb-8 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                  <div className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    Item Name
                  </div>
                  <div className="text-center text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    QTY.
                  </div>
                  <div className="text-right text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    Price
                  </div>
                  <div className="text-right text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-invoice-muted-blue">
                    Total
                  </div>
                </div>

                {/* Item rows */}
                <div className="space-y-8">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4"
                    >
                      <div className="text-[15px] font-bold leading-[15px] tracking-tight text-foreground">
                        {item.name}
                      </div>
                      <div className="text-center text-[15px] font-bold leading-[15px] tracking-tight text-invoice-muted-blue">
                        {item.quantity}
                      </div>
                      <div className="text-right text-[15px] font-bold leading-[15px] tracking-tight text-invoice-muted-blue">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="text-right text-[15px] font-bold leading-[15px] tracking-tight text-foreground">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Due footer */}
              <div className="flex items-center justify-between bg-invoice-draft-light px-8 py-6 dark:bg-invoice-black">
                <div className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-white">
                  Amount Due
                </div>
                <div className="text-2xl font-bold leading-none tracking-tight text-white">
                  {formatCurrency(invoice.total)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
