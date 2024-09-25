import React, { useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Fuse from "fuse.js";
import { matchSorter } from "match-sorter";

// import "./AutoCompleteSearch.css";

function RBAutoCompleteSearch(props) {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [rows, setRows] = useState([]);
  const ref = useRef();
  const dummyItems = [
    {
      title: "a",
    },
    { title: "b" },
    {
      title: "c",
    },
    {
      title: "d",
    },
    {
      title: "e",
    },
    {
      title: "f",
    },
  ];
  React.useEffect(() => {
    (function () {
      let activeElIndex = 0;
      const children = ref.current.children;
      ref.current.addEventListener("keydown", (event) => {
        // const activeElement = document.activeElement;
        if (event.key === "ArrowUp") {
          if (activeElIndex > 0) {
            activeElIndex--;
            if (activeElIndex > 0) {
              children[1].children[activeElIndex - 1].focus();
            } else children[0].focus();
          }
        }
        if (event.key === "ArrowDown") {
          activeElIndex++;

          if (activeElIndex < children[1].children.length + 1)
            children[1].children[activeElIndex - 1].focus();
          else activeElIndex--;
        }
      });
    })();
  }, []);
  React.useEffect(() => {
    (function () {
      setValue("");
    })();
  }, []);

  // React.useEffect(() => {
  //   (function () {
  //     if (props.closeSuggestionBox === true) setRows([]);
  //   })();
  // }, [props.closeSuggestionBox]);

  const onChange = (event) => {
    // props.setCloseSuggestionBox(false);
    let newValue = event.target.value;
    setValue(newValue);
    let searchSuggestions;
    if (newValue) {
      searchSuggestions = matchSorter(dummyItems, newValue, {
        keys: ["title"],
      });
    } else searchSuggestions = [];

    const newRows = searchSuggestions.map((item) => (
      <button
        className=" border rounded-0 auto-b"
        onClick={selectSuggetionHandler}
      >
        {item.title}
      </button>
    ));
    setRows(newRows);
  };
  const selectSuggetionHandler = (event) => {
    // props.handleWordChange(event.target.textContent);
    setValue("");
    setSelectedItems([...selectedItems, event.target.textContent]);
    setRows([]);
  };
  const selectedItemsElements = selectedItems.map((selectedItem) => (
    <div>{selectedItem}</div>
  ));

  return (
    <div ref={ref} className="auto-wrapper">
      <div className="d-flex w-100 ">
        {selectedItemsElements}
        <input
          value={value}
          type="search"
          onChange={onChange}
          className="auto-input"
          placeholder={
            props.type ? "Search in subtitle" : "Search in data-base"
          }
        />
      </div>
      <div className="list-group auto-ul-wrapper">{rows}</div>
    </div>
  );
}
export default RBAutoCompleteSearch;
