import React, { useState } from "react";
import { useData } from "./useData";

function SearchBox() {
  const { data, isLoading, error } = useData(
    "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
  );
  const [searchText, setSearchText] = useState("");
  console.log(data);

  return (
    <div>
      <h4>{"Search Box"}</h4>
      {error ? <p>{error}</p> : null}
      {isLoading ? "Loading..." : null}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div
        style={{
          border: "4px solid blue",
          width: "50%",
          margin: "auto",
          marginTop: 40,
        }}
      >
        {data?.map((item) => (
          <div key={item.name} style={{ border: "3px solid black" }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBox;
