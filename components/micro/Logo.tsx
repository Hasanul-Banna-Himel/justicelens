import Link from "next/link";

export default function Logo({
  type,
  url,
}: {
  type: "url" | "static";
  url?: string;
}) {
  const LOGO = (
    <div className="logo">
      <div className="container-t flex flex-col gap-0 text-[var(--aj-primary)] font-bold">
        <div className="big leading-none text-lg text-right">Justice</div>
        <div className="small leading-none text-sm text-right">Lens</div>
      </div>
    </div>
  );
  return type === "url" ? url && <Link href={url}>{LOGO}</Link> : LOGO;
}
