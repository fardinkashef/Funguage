import { databaseWord, subtitleWord } from "@/lib/types";

type WordSearchInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  selectedItems: subtitleWord[] | databaseWord[];
  setSelectedItems: (newSelectedItems: any) => void;
  placeHolder: "subtitle word" | "database word";
};

function WordSearchInput({
  value,
  setValue,
  selectedItems,
  setSelectedItems,
  placeHolder,
}: WordSearchInputProps) {
  // Handlers 👇:
  const handleRemoveSelectedItem = (index: number) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="grow w-full flex items-center gap-2 flex-wrap p-1 rounded-sm">
      {selectedItems.map((selectedItem, index) => (
        <div
          className="flex justify-between items-center m-1 border-solid border-gray-500 border-2 rounded-sm"
          key={selectedItem.title}
        >
          <span className="p-1 border-r-2">{selectedItem.title}</span>
          <button
            className="text-xs"
            onClick={() => handleRemoveSelectedItem(index)}
            key={selectedItem.title}
          >
            ❌
          </button>
        </div>
      ))}
      <input
        className="w-48 bg-transparent text-center border-none outline-none mx-auto my-0"
        value={value}
        type="search"
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
}
export default WordSearchInput;
