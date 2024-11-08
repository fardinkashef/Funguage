"use client";
import { Button } from "@/components/ui/button";
import { databaseWord, subtitleWord, wordsPair } from "@/lib/types";
import { useState } from "react";
import Select from "react-select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

type WordsPairFormProps = {
  initialWordsPair?: wordsPair;
  subtitleWords: subtitleWord[];
  databaseWords: databaseWord[];
};

export default function WordsPairForm({
  initialWordsPair = { subtitleWordList: [], databaseWordList: [] },
  subtitleWords,
  databaseWords,
}: WordsPairFormProps) {
  const [subtitleWordList, setSubtitleWordList] = useState(
    initialWordsPair.subtitleWordList
  );
  const [databaseWordList, setDatabaseWordList] = useState(
    initialWordsPair.databaseWordList
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("subtitle", subtitleWordList);
    console.log("database", databaseWordList);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Select
        defaultValue={initialWordsPair.subtitleWordList}
        isMulti
        options={subtitleWords}
        getOptionLabel={(option) => option.title}
        getOptionValue={(option) => option}
        name="subtitle"
        onChange={setSubtitleWordList}
        // styles={colourStyles}
      />
      <Select
        defaultValue={initialWordsPair.databaseWordList}
        isMulti
        options={databaseWords}
        getOptionLabel={(option) => option.title}
        getOptionValue={(option) => option._id as string}
        name="database"
        onChange={setDatabaseWordList}

        // styles={colourStyles}
      />
      <Button variant="ghost" type="submit">
        log
      </Button>
    </form>
  );
}
