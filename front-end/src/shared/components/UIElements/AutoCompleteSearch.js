import React, { useState, useRef } from "react";

import Fuse from "fuse.js";

import "./AutoCompleteSearch.css";

const AutoCompleteSearch = (props) => {
  const [value, setValue] = useState("");
  const [rows, setRows] = useState([]);
  const ref = useRef();

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
              children[1].children[0].children[
                activeElIndex - 1
              ].children[0].focus({
                preventScroll: true,
              });
            } else children[0].focus({ preventScroll: true });
          }
          // if (activeEl.nodeName.toLowerCase() === "input") {
          //   // console.log("hello me");
          //   // var val = activeEl.value; //store the value of the element
          //   // activeEl.value = ""; //clear the value of the element
          //   // activeEl.value = val; //set that value back.
          //   // let end = activeEl.value.length;
          //   // // ✅ Move focus to END of input field
          //   // activeEl.setSelectionRange(end, end);
          //   activeEl.select();
          // }

          // children[activeElIndex].select();

          // console.log("active", document.activeElement);
        }
        if (event.key === "ArrowDown") {
          activeElIndex++;
          // console.log("n of children[1]", children[1].children.length);
          console.log("actice el", document.activeElement);
          // console.log("n of children[1]", children[1].children.length);

          if (activeElIndex < children[1].children[0].children.length + 1)
            children[1].children[0].children[
              activeElIndex - 1
            ].children[0].focus({
              preventScroll: true,
            });
          else activeElIndex--;

          // console.log(children[activeElIndex]);
        }
      });
    })();
  }, []);

  const list = [
    {
      title: "Old Man's War",
      author: {
        firstName: "John",
        lastName: "Scalzi",
      },
    },
    {
      title: "The Lock Artist",
      author: {
        firstName: "Steve",
        lastName: "Hamilton",
      },
    },
    {
      title: "HTML5",
      author: {
        firstName: "Remy",
        lastName: "Sharp",
      },
    },
    {
      title: "Right Ho Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "The Code of the Wooster",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "Thank You Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "The DaVinci Code",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "Angels & Demons",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "The Silmarillion",
      author: {
        firstName: "J.R.R",
        lastName: "Tolkien",
      },
    },
    {
      title: "Syrup",
      author: {
        firstName: "Max",
        lastName: "Barry",
      },
    },
    {
      title: "The Lost Symbol",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "The Book of Lies",
      author: {
        firstName: "Brad",
        lastName: "Meltzer",
      },
    },
    {
      title: "Lamb",
      author: {
        firstName: "Christopher",
        lastName: "Moore",
      },
    },
    {
      title: "Fool",
      author: {
        firstName: "Christopher",
        lastName: "Moore",
      },
    },
    {
      title: "Incompetence",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Fat",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Colony",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Backwards, Red Dwarf",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "The Grand Design",
      author: {
        firstName: "Stephen",
        lastName: "Hawking",
      },
    },
    {
      title: "The Book of Samson",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "The Preservationist",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "Fallen",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "Monster 1959",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
  ];
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    // keys: ["title", "author.firstName"],
    // keys: ["word"],
    keys: ["word"],
  };

  const fuse = new Fuse(props.items, options);
  // console.log("mwwwwwwwwwww", props.items);
  const onChange = (event) => {
    setValue(event.target.value);
    const searchSuggestions = fuse.search(event.target.value);
    console.log(searchSuggestions);

    const newRows = searchSuggestions.map((item) => (
      <li tabIndex={0} className="auto-li">
        <button className="auto-b">{item.item.word}</button>
        <p className="auto-p">shwrthwj5j57j7537i576i7i</p>
      </li>
    ));
    setRows(newRows);
  };
  return (
    <div ref={ref} className="auto-wrapper">
      <input
        value={value}
        type="search"
        onChange={onChange}
        className="auto-input"
      />
      <div className="auto-ul-wrapper">
        <ul className="auto-ul">{rows}</ul>
      </div>
    </div>
  );
};

export default AutoCompleteSearch;
