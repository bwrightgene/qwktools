import { ThemeToggle } from "./components/theme-toggle";
import ToolLoader from "./ToolLoader";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center justify-center w-full min-h-[60vh]">
        <ToolLoader />
      </main>
      <footer className="flex flex-col gap-5 items-center justify-center">
        <ThemeToggle />
        <p>
          QWK tools is a{" "}
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
