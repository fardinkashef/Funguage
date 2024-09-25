import { databaseWord, subtitleWord } from "@/shared/types/wordDataTypes";
import "./WordSearchInput.scss";

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
    <div className="WordSearchInput">
      {selectedItems.map((selectedItem, index) => (
        <div className="selected-item" key={selectedItem.title}>
          <span>{selectedItem.title}</span>
          <button
            className="word-search-input-remove"
            onClick={() => handleRemoveSelectedItem(index)}
            key={selectedItem.title}
          />
        </div>
      ))}
      <input
        value={value}
        type="search"
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
}
export default WordSearchInput;
