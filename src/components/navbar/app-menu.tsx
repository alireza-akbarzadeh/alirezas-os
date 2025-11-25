import { navLinks } from "@/constants";

export function AppMenus({
  handleNavClick,
}: {
  handleNavClick: (type: string) => void;
}) {
  return (
    <>
      {navLinks.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.type)}
          className="flex h-[25px] items-center transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
        >
          {item.name}
        </button>
      ))}
    </>
  );
}
