import { Item, useCopyToClipboard } from "@/hooks";
import { ItemField } from "../ItemField";
import { useEffect, useState } from "react";

const useClickCount = (callBack: any) => {
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (clickCount === 3) {
      callBack();
      setClickCount(0);
    } else if (clickCount > 0) {
      const timerId = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [clickCount, callBack]);

  return { handleClick };
};

export const OneItem = ({
  item,
  handleDelete,
}: {
  item: Item;
  handleDelete?: () => void;
}) => {
  const { label, fields, note } = item;
  const { copied, copyToClipboard } = useCopyToClipboard();
  const { handleClick } = useClickCount(handleDelete);
  return (
    <div className="p-4 bg-blue-50 w-full ">
      <div className="mb-4 flex justify-between gap-4">
        <div className="flex flex-wrap gap-2 flex-1">
          {item.category.map((category) => (
            <div
              key={category}
              className="text-sm rounded-sm text-orange-500 bg-orange-50 border border-orange-700 px-2 py-1"
            >
              {category}
            </div>
          ))}
        </div>
        <button
          className="bg-red-400 p-1 px-2 text-white text-sm rounded"
          onClick={handleClick}
        >
          X
        </button>
      </div>
      <div
        className={`cursor-pointer font-bold text-lg ${
          copied ? "text-emerald-700" : ""
        }`}
        onClick={() => {
          copyToClipboard(label);
        }}
      >
        {label}
      </div>

      {note && <div>{note}</div>}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 mt-2">
        {fields.map((field, index) => (
          <ItemField key={`${field.name}-${index}`} field={field} />
        ))}
      </div>
    </div>
  );
};
