import { Field, useCopyToClipboard } from "@/hooks";

export const ItemField = ({ field }: { field: Field }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const bgClass = copied ? "bg-emerald-700" : "bg-blue-700";

  return (
    <div
      onClick={() => {
        copyToClipboard(field.value);
      }}
      className={`cursor-pointer border ${bgClass} text-white text-center rounded-sm p-1`}
    >
      {copied ? "Copied!" : field.name}
    </div>
  );
};
