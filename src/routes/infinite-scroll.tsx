import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/infinite-scroll")({
  component: InfiniteScroll,
});

// function InfiniteScroll() {
//   const [items, setItems] = useState(Array.from({ length: 20 })); // Initial 20 items
//   const observer = useRef(); // To hold reference of the observer

//   // Function to simulate loading more items
//   const loadMoreItems = () => {
//     setTimeout(() => {
//       setItems((prevItems) => [
//         ...prevItems,
//         ...Array.from({ length: 40 }), // Add 20 more items
//       ]);
//     }, 1000);
//   };

//   const loadMoreData = () => {
//     setTimeout(() => {
//       setItems([...items, ...Array.from({ length: 40 })]);
//     }, 1000);
//   };

//   const lastItemRef = useRef(null);

//   // Set up the IntersectionObserver
//   useEffect(() => {
//     if (observer.current) observer.current.disconnect(); // Disconnect the old observer

//     const options = {
//       root: null, // Observe the viewport
//       rootMargin: "0px",
//       threshold: 1.0, // When the last item is fully in view
//     };

//     observer.current = new IntersectionObserver((entries) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         loadMoreItems();
//       }
//     }, options);

//     if (lastItemRef.current) observer.current.observe(lastItemRef.current);

//     return () => observer.current.disconnect();
//   }, [lastItemRef.current]);

//   return (
//     <div>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>Item {index + 1}</li>
//         ))}
//       </ul>
//       <div
//         ref={lastItemRef}
//         style={{ height: "50px", backgroundColor: "lightgray" }}
//       >
//         Loading more items....
//         {/* {hasMore ? "Loading more items..." : "No more items"} */}
//       </div>
//     </div>
//   );
// }

function InfiniteScroll() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<unknown[]>(Array.from({ length: 40 }));

  const observer = useRef<IntersectionObserver>();
  const lastItemRef = useRef(null);

  useEffect(() => {
    console.log("In use effect");
    if (observer.current) observer.current.disconnect(); // Disconnect the old observer

    const options = {
      root: null, // Observe viewport
      rootMargin: "0px",
      threshold: 1.0,
    };

    const loadMoreData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setItems((prevItems) => [...prevItems, ...Array.from({ length: 40 })]);
        setIsLoading(false);
      }, 1000);
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
        Loading more items...
      </div>
    </div>
  );
}
