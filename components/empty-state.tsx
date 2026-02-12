export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Placeholder illustration - simple SVG */}
      <div className="mb-10">
        <svg
          width="240"
          height="200"
          viewBox="0 0 240 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-50"
        >
          {/* Simple envelope illustration */}
          <rect
            x="40"
            y="60"
            width="160"
            height="100"
            rx="8"
            className="fill-muted stroke-border"
            strokeWidth="2"
          />
          <path
            d="M40 60L120 120L200 60"
            className="stroke-border"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Simple person sitting */}
          <circle cx="120" cy="100" r="20" className="fill-muted-foreground" />
          <rect
            x="100"
            y="120"
            width="40"
            height="40"
            rx="4"
            className="fill-muted-foreground"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold leading-none tracking-tight text-foreground">
        There is nothing here
      </h2>

      {/* Subtext */}
      <p className="max-w-[220px] text-center text-[13px] font-medium leading-[18px] tracking-[-0.1px] text-muted-foreground">
        Create an invoice by clicking the{" "}
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
}
