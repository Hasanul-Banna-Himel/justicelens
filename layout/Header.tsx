import Logo from "@/components/micro/Logo";
import NavBar from "@/components/micro/NavBar";

export default function Header() {
  return (
    <header className="aj-header sticky top-0 left-0 right-0 flex">
      <div className="container flex items-center justify-between gap-4 w-[min(1440px,100%)] m-auto py-2 px-5">
        <Logo type="url" url="/" />
        <NavBar />
      </div>
    </header>
  );
}
