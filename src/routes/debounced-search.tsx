import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/debounced-search")({
  component: DebouncedSearch,
});

const DEBOUNCE_MS = 1000;

type Result = {
  title: string;
  author: string;
  id: number;
};

// Create useDebounce hook, add loading state

function DebouncedSearch() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    const ref = setTimeout(() => {
      setSearchQuery(inputValue);
    }, DEBOUNCE_MS);

    return () => clearTimeout(ref);
  }, [inputValue]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const url = `https://openlibrary.org/search.json?title=${searchQuery}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(
          data.docs.map(
            (doc: {
              title: string;
              author_name: string[];
              _version_: string;
            }) => ({
              title: doc.title,
              author: doc.author_name[0],
              id: self.crypto.randomUUID(),
            })
          )
        );
      })
      .catch((error) => console.error("Error: ", error));
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
      <h4>Results:</h4>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.title} by {result.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
