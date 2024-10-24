import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
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
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
