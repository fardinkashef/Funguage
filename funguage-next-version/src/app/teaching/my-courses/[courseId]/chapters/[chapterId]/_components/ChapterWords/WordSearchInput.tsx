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
    <div className="WordSearchInput w-full min-h-6 flex justify-start items-center gap-1 flex-wrap p-1 rounded-sm">
      {selectedItems.map((selectedItem, index) => (
        <div
          className="selected-item px-0 py-1 flex justify-between items-center rounded m-1"
          key={selectedItem.title}
        >
          <span className="p-1 border-r-2">{selectedItem.title}</span>
          <button
            className="word-search-input-remove"
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
