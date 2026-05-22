import { Header } from "@/components/layout/Header";
import { HistoryStrip } from "@/components/layout/HistoryStrip";
import { Studio } from "@/components/studio/Studio";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
      <Header />
      <HistoryStrip />
      <Studio />
    </div>
  );
}
