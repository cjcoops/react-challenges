import { useState } from "react";
import { COLOUR_THEME_LOCAL_STORAGE_NAME } from "../constants";

function ColourThemeSwitcher({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = useState(initialTheme);

  function handleThemeChange() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem(COLOUR_THEME_LOCAL_STORAGE_NAME, nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <button className="btn" onClick={handleThemeChange}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default ColourThemeSwitcher;
