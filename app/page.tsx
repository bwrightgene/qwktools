import { MenuBar } from "./components/menu-bar";
import { ThemeToggle } from "./components/theme-toggle";
import ToolLoader from "./ToolLoader";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex flex-col gap-4 items-center">
        <MenuBar />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center w-full min-h-[60vh]">
        <div className="w-full flex justify-center">
          <ToolLoader />
        </div>
      </main>
      <footer className="row-start-3 flex flex-col gap-5 items-center justify-center">
        <ThemeToggle />
        <p>
          A{" "}
          <a
            href="https://wmh.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Wright Media House
          </a>{" "}
          vision
        </p>
      </footer>
    </div>
  );
}
