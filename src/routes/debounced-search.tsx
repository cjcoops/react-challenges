import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/debounced-search")({
  component: DebouncedSearch,
});

type Result = {
  title: string;
  author: string;
  id: number;
};

// Create useDebounce hook, add loading state

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const ref = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(ref);
  }, [value, delay]);

  return debouncedValue;
}

function DebouncedSearch() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchQuery = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    const url = `https://openlibrary.org/search.json?title=${searchQuery}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(
          data.docs.map((doc: { title: string; author_name: string[] }) => ({
            title: doc.title,
            author: doc.author_name?.[0],
            id: self.crypto.randomUUID(),
          }))
        );
      })
      .catch((error) => console.error("Error: ", error))
      .finally(() => setIsLoading(false));
  }, [searchQuery]);

  return (
    <div className="p-2 flex flex-col gap-2">
      <input
        type="search"
        className="input"
        placeholder="Search for books"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              {result.title} by {result.author}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && "No results found."
      )}
    </div>
  );
}
