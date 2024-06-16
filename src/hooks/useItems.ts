import { db } from "@/libs/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import unidecode from "unidecode";

export interface Item {
  label: string;
  fields: Field[];
  note?: string;
  category: string[];
  id: string;
}

export type WithSearchString<T> = T & { searchString: string };

export interface Field {
  name: string;
  value: string;
}

const addSearchString = (items: Item[]): WithSearchString<Item>[] => {
  return items.map((item) => {
    const fieldsString = item.fields.map((field) => field.name).join(" ");
    const categoriesString = item.category.join(" ");
    const searchString = unidecode(
      `${item.label} ${fieldsString} ${categoriesString}`
    ).toLowerCase();
    return {
      ...item,
      searchString,
    };
  });
};

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const items = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Item),
      id: doc.id,
    }));
    setItems(items);
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "item", id));
    setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items: addSearchString(items),
    deleteItem,
  };
};
