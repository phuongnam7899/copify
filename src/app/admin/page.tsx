"use client";

import { Item, useItems } from "@/hooks";
import { db } from "@/libs/firebase";
import autosize from "autosize";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { OneItem } from "../(components)";
import { useRouter } from "next/navigation";

function isValidArrayJson(jsonString: string) {
  try {
    const parsedValue = JSON.parse(jsonString);
    if (!Array.isArray(parsedValue)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

export default function Admin() {
  const { items } = useItems();
  const upsertTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [upsertText, setUpsertText] = useState("");
  const router = useRouter();

  const handleUpsert = async () => {
    const upsertData = JSON.parse(upsertText);

    for (let newItem of upsertData) {
      const itemExisted = items.find(
        (item) =>
          item.label === newItem.label &&
          item.category.join() === newItem.category.join()
      );

      if (!itemExisted) {
        await addDoc(collection(db, "item"), newItem);
      } else {
        const itemRef = doc(db, "item", itemExisted.id);
        await updateDoc(itemRef, {
          ...newItem,
        });
      }
    }
    router.replace("/");
  };

  const handleGenerateItemTemplate = () => {
    const fieldCount = upsertText ? Number(upsertText) : 1;
    const fields = [];
    for (let i = 0; i < fieldCount; i++) {
      fields.push({
        name: "",
        value: "",
      });
    }
    setUpsertText(
      JSON.stringify(
        [
          {
            label: "",
            fields,
            category: [""],
            note: "note",
          },
        ],
        null,
        2
      )
    );
  };

  useEffect(() => {
    if (upsertTextAreaRef.current) {
      autosize(upsertTextAreaRef.current);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <div className="w-1/3">
          <div className="flex items-center gap-4 mb-4">
            <div className=" font-bold text-lg">Upsert</div>
            <button
              className="bg-blue-500 text-white p-2 rounded-sm mt-2"
              onClick={handleGenerateItemTemplate}
            >
              {" "}
              Generate Item Template
            </button>
          </div>

          <textarea
            ref={upsertTextAreaRef}
            value={upsertText}
            onChange={(e) => setUpsertText(e.target.value)}
            className="border w-full p-2"
          ></textarea>
        </div>
        <div className="w-1/3">
          <div>Preview</div>
          {isValidArrayJson(upsertText) &&
            JSON.parse(upsertText).map((item: Item, index: number) => (
              <div key={index} className="mb-2">
                <OneItem item={item} />
              </div>
            ))}
          <button
            className="bg-blue-500 text-white p-2 rounded-sm mt-2 mr-2"
            onClick={handleUpsert}
          >
            {" "}
            Upsert
          </button>
        </div>
      </div>
    </div>
  );
}
