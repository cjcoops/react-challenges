import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/infinite-scroll")({
  component: InfiniteScroll,
});

function InfiniteScroll() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<unknown[]>(Array.from({ length: 40 }));

  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useRef(null);

  const loadMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 40 })]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("In use effect");
    if (observer.current) observer.current.disconnect(); // Disconnect the old observer

    const options = {
      root: null, // Observe viewport
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreData();
      }
    }, options);

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => observer.current?.disconnect();
  }, [lastItemRef.current]);

  return (
    <div className="p-2">
      <ul>
        {items.map((_, index) => (
          <li key={index}>Item {index + 1}</li>
        ))}
      </ul>
      <div className="bg-gray-200" ref={lastItemRef}>
        {isLoading && "Loading more items..."}
      </div>
    </div>
  );
}
