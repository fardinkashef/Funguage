import React, { useState, useRef, useMemo, useEffect, ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //These css are optional and implements the basic styles for the tooltip
import { matchSorter } from "match-sorter";

import WordSearchInput from "./WordSearchInput";
import { cue, databaseWord, subtitleWord } from "@/lib/types";

type WordAutoCompleteSearchProps = {
  type: "subtitle" | "database";
  itemsToSearchIn: ReadonlyArray<subtitleWord> | ReadonlyArray<databaseWord>;
  //////////
  cues?: cue[];
  //////////
  selectedItems: subtitleWord[] | databaseWord[];
  setSelectedItems: (newSelectedItems: any) => void;
  /////////
  suggestionBoxClosed: boolean;
  setSuggestionBoxClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WordAutoCompleteSearch({
  type,
  itemsToSearchIn,
  //////////
  cues,
  //////////
  selectedItems,
  setSelectedItems,
}: /////////
//   suggestionBoxClosed,
//   setSuggestionBoxClosed,
WordAutoCompleteSearchProps) {
  const [value, setValue] = useState("");

  const searchSuggestions = useMemo(() => {
    if (!value) return [];
    return matchSorter<databaseWord | subtitleWord>(itemsToSearchIn, value, {
      keys: ["title"],
    });
  }, [value, itemsToSearchIn]);

  const handleSelectSuggetion = (selectedSuggestion:any) => {
    setValue("");
    if (!selectedSuggestion) return;
    const newSelectedItems = [...selectedItems, selectedSuggestion];
    setSelectedItems(newSelectedItems);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(function () {
    if (!ref.current) return;

    let activeElIndex = 0;
    const children = ref.current.children;
    ref.current.addEventListener("keydown", (event) => {
      // const activeElement = document.activeElement;
      if (event.key === "ArrowUp") {
        if (activeElIndex > 0) {
          activeElIndex--;
          if (activeElIndex > 0) {
            (children[1].children[activeElIndex - 1] as HTMLElement).focus();
          } else (children[0] as HTMLElement).focus();
        }
      }
      if (event.key === "ArrowDown") {
        activeElIndex++;

        if (activeElIndex < children[1].children.length + 1)
          (children[1].children[activeElIndex - 1] as HTMLElement).focus();
        else activeElIndex--;
      }
    });
  }, []);

  return (
    <div
      ref={ref}
      className="w-full max-w-80 flex items-center gap-2 p-2 relative border-solid border-gray-500 border-2 outline-none rounded-sm focus:border-blue-500"
    >
      <WordSearchInput
        value={value}
        setValue={setValue}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        placeHolder={type === "subtitle" ? "subtitle word" : "database word"}
      />
      {/* divider: 👇 */}
      <div className="bg-gray-500 self-stretch w-0.5" />
      {/* caret: 👇 */}
      <div className="border-solid border-4 border-transparent border-t-gray-500  translate-x-0 translate-y-1/4" />
      {/* options: 👇 */}
      <div
        className={`w-full my-2 absolute top-full left-0 z-10 border-solid border-gray-500 border-2 rounded-sm ${
          searchSuggestions.length === 0 ? "hidden" : ""
        }`}
      >
        {searchSuggestions.map((item, index) => {
          let tooltipContent: string | (string | ReactNode)[];
          if (type === "database") {
            tooltipContent = (item as databaseWord).meaning.definition.text;
          } else {
            if (!cues) return;
            const cue = cues.filter(
              (cue) => cue.id === (item as subtitleWord).cueId
            )[0];
            const cueText = cue.text;
            tooltipContent = cueText
              .split(`${item.title}`)
              .map((phrase, index, array) => {
                if (index === array.length - 1) return `${phrase}`;
                if (index + 1 !== (item as subtitleWord).orderNumber)
                  return `${phrase}${item.title}`;
                return (
                  <span key={item.title}>
                    {`${phrase}`}
                    <span style={{ color: "red" }}>{item.title}</span>
                  </span>
                );
              });
          }

          return (
            <Tippy
              content={
                <span style={{ fontSize: "1.2rem" }}>{tooltipContent}</span>
              }
              placement="auto-end"
              key={index}
            >
              <button
                className="w-full bg-white p-2 border-none hover:bg-gray-500"
                onClick={() => handleSelectSuggetion(item)}
              >
                {"orderNumber" in item && item.orderNumber > 1
                  ? `${item.title} (${item.orderNumber})`
                  : item.title}
              </button>
            </Tippy>
          );
        })}
      </div>
    </div>
  );
}
