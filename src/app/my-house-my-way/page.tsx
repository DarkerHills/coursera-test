import type { Metadata } from "next";
import { Sidebar } from "@/components/mhmw/Sidebar";
import { Hero } from "@/components/mhmw/Hero";

export const metadata: Metadata = {
  title: "My House My Way — find a house that suits the ways you live",
  description:
    "Save ideas, connect with designers, and get personalised home recommendations — all in one place.",
};

export default function MyHouseMyWayPage() {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-mhmw-grey-10 lg:h-screen lg:flex-row lg:overflow-hidden"
      data-node-id="2901:41846"
    >
      <Sidebar />
      <Hero />
    </div>
  );
}
