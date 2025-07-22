import Feed from "@/components/views/Feed";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <aside className="md:col-start-1 md:col-span-3"></aside>
      <main className="md:col-start-4 md:col-span-6">
        <Feed />
      </main>
      <aside className="md:col-start-9 md:col-span-3"></aside>
    </div>
  );
}
