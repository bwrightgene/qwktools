import { MenuBar } from "./components/menu-bar";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex flex-col gap-4 items-center">
        <MenuBar />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>Coming Soon</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <ThemeToggle />
        <p>A Wright Media House vision</p>
      </footer>
    </div>
  );
}
