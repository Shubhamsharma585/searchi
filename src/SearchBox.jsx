import React, { useEffect, useState, useRef } from "react";
import { useData } from "./useData";
import SearchResults from "./SearchResults";

function SearchBox() {
  const { data, isLoading, error } = useData(
    "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
  );
  const [searchText, setSearchText] = useState("");
  const [relatedResults, setRelatedResults] = useState([]);
  console.log(data);

  useEffect(() => {
    const searchFields = ["address", "id", "items", "name", "pincode"];
    const searchRegex = new RegExp(searchText, "i");

    let ndata = data.filter((obj) =>
      searchFields.some((field) => obj[field].toString().match(searchRegex))
    );
    setRelatedResults(ndata);
  }, [searchText, data]);

  return (
    <div>
      <h4>{"Search Box"}</h4>
      {error ? <p>{error}</p> : null}
      {isLoading ? (
        "Loading..."
      ) : (
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users by ID, name and others"
        />
      )}
      <SearchResults relatedResults={relatedResults} searchText={searchText} />
    </div>
  );
}

export default SearchBox;
