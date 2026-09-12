import { NavBar } from "@/components/layout/NavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border-secondary bg-surface-primary px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-6xl font-body text-[13px] leading-5 text-text-tertiary">
          Assay reports what issuers publish and ages it — it does not verify assets itself and
          does not touch custody, execution, or KYC. Not investment advice.
        </p>
      </footer>
    </div>
  );
}
