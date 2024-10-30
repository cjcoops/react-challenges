import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import ColourThemeSwitcher from "../components/ColourThemeSwitcher";
import { COLOUR_THEME_LOCAL_STORAGE_NAME } from "../constants";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const savedTheme = localStorage.getItem(COLOUR_THEME_LOCAL_STORAGE_NAME);
  const theme = savedTheme || "light";
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to="/about"
          activeProps={{
            className: "font-bold",
          }}
        >
          About
        </Link>
        <Link
          to="/todos"
          activeProps={{
            className: "font-bold",
          }}
        >
          Todos
        </Link>
        <Link
          to="/debounced-search"
          activeProps={{
            className: "font-bold",
          }}
        >
          Debounce
        </Link>
        <Link
          to="/infinite-scroll"
          activeProps={{
            className: "font-bold",
          }}
        >
          Infinite
        </Link>
        <Link
          to="/dynamic-form"
          activeProps={{
            className: "font-bold",
          }}
        >
          Dynamic
        </Link>
        <div className="ml-auto">
          <ColourThemeSwitcher initialTheme={theme} />
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
