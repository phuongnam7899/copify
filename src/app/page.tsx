"use client";

import { useEffect, useState } from "react";
import { OneItem, SearchBox } from "./(components)";
import stringSimilarity from "string-similarity";
import { useItems } from "@/hooks";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const { items, deleteItem } = useItems();
  const router = useRouter();
  const searchedItems = items.sort((a, b) => {
    const similarityToA = stringSimilarity.compareTwoStrings(
      searchInput,
      a.searchString
    );
    const similarityToB = stringSimilarity.compareTwoStrings(
      searchInput,
      b.searchString
    );
    return similarityToB - similarityToA; // sort in descending order of similarity
  });

  useEffect(() => {
    if (auth.currentUser?.email !== "phuongnam7899@gmail.com") {
      router.replace("/login");
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center py-4">
      <SearchBox
        onChange={(newValue) => {
          setSearchInput(newValue);
        }}
        value={searchInput}
      />
      <div className="w-1/3 min-w-80 flex flex-col gap-2">
        {searchedItems.map((item, index) => (
          <OneItem
            key={index}
            item={item}
            handleDelete={() => {
              deleteItem(item.id);
            }}
          />
        ))}
      </div>
    </main>
  );
}
