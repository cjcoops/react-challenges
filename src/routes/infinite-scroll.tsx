import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/infinite-scroll")({
  component: InfiniteScroll,
});

const LIMIT = 25;

function InfiniteScroll() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<unknown[]>([]);

  const observer = useRef<IntersectionObserver>();

  const loadMoreData = async (pageNumber: number) => {
    setIsLoading(true);

    // Add a fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${pageNumber}`
    );

    const data = await response.json();

    setItems((prevItems) => [...prevItems, ...data]);
    setIsLoading(false);

    if (data.length < LIMIT) {
      setHasMoreData(false);
    }
  };

  // When page number changes, load more data
  useEffect(() => {
    loadMoreData(pageNumber);
  }, [pageNumber]);

  // useCallback caches the callback function, removing from the cache when isLoading or hasMoreData change
  // By assigning to lastItemRef, the callback function is called every time the lastItemRef div re-rendered or component is mounted/unmounted
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect(); // Disconnect the old observer

      const options = {
        root: null, // Observe viewport
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMoreData) {
          setPageNumber((prevState) => prevState + 1);
        }
      }, options);

      if (node) observer.current.observe(node); // Observe the "last item ref" element
    },
    [isLoading, hasMoreData]
  );

  return (
    <div className="p-2">
      <ul>
        {items.map((_, index) => (
          <li key={index}>Item {index + 1}</li>
        ))}
      </ul>
      {isLoading && <p> Loading more items...</p>}
      <div className="bg-gray-200" ref={lastItemRef}></div>
      {!hasMoreData && <p> No more results.</p>}
    </div>
  );
}
