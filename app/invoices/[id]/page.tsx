import { Sidebar } from "@/components/sidebar";
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

          {/* Placeholder content */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-card p-16 text-center shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] dark:shadow-[0_10px_10px_-10px_rgba(0,0,0,0.25)]">
            <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-foreground">
              View Invoice #{id}
            </h1>
            <p className="text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-muted-foreground">
              This page will display the full invoice details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
