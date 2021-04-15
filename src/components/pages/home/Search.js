import React from "react";
import * as AiIcons from "react-icons/ai";

import "./Search.css";

function Search({ input, setInput }) {
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-bar-input">
        <input onChange={inputHandler} type="text" placeholder="Search" value={input}/>
      </div>
      <div className="search-bar-icon">
        <AiIcons.AiOutlineSearch />
      </div>
    </div>
  );
}

export default Search;
