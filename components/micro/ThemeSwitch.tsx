import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = (resolvedTheme || theme) === "dark";
  const [Theme, setThemeState] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setThemeState(isDark);
  }, [isDark]);

  return (
    <div
      className="aj-theme-toggle flex items-center rounded-3xl bg-[var(--aj-background-substitute)] w-12 h-6 p-1 relative"
      role="button"
      tabIndex={0}
      onClick={() => {
        const nextDark = !Theme;
        setThemeState(nextDark);
        setTheme(nextDark ? "dark" : "light");
      }}
    >
      <div className="container w-full h-full relative">
        <div
          className={`circle rounded-[50%] overflow-hidden h-full aspect-square bg-slate-400 absolute top-0 bottom-0 transition-all ease-in-out duration-300 right-0 ${
            Theme ? "" : "left-0"
          }`}
        >
          {mounted && (
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg"
            alt="Moon denoting dark theme"
            className={`w-full h-full object-cover object-center transition-all ease-in-out duration-300 opacity-0 absolute inset-0 ${
              Theme ? "opacity-1" : ""
            }`}
          />
          )}
          {mounted && (
          <img
            src="https://cdn.britannica.com/31/160431-050-C38A5086/Image-Earth-Russian-Elektro-L-weather-satellite-2012.jpg"
            alt="Earth denoting light theme"
            className={`w-full h-full object-cover object-center transition-all ease-in-out duration-300 opacity-0 absolute inset-0 ${
              Theme ? "" : "opacity-1"
            }`}
          />
          )}
        </div>
      </div>
    </div>
  );
}
