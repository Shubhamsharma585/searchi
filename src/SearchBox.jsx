import React, { useEffect, useState } from "react";
import { useData } from "./useData";

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

  const highlightText = (text, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const checkInItems = (query, arr) => {
    let flag = arr?.some((itm) =>
      itm.toLowerCase().includes(query.toLowerCase())
    );
    return flag;
  };

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
      <div
        style={{
          border: "4px solid blue",
          width: "50%",
          margin: "auto",
          marginTop: 40,
          height: 500,
          overflow: "scroll",
        }}
      >
        {relatedResults?.length > 0 ? (
          <>
            {relatedResults?.map((item) => (
              <div key={item.id} style={{ border: "3px solid black" }}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.id, searchText),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.name, searchText),
                  }}
                />
                <p>
                  {searchText !== "" ? (
                    checkInItems(searchText, item.items) ? (
                      <>
                        <span>{`·`}</span>
                        <span style={{ color: "blue", marginRight: 10 }}>
                          {searchText}
                        </span>
                        <span>{`found in items`}</span>
                      </>
                    ) : null
                  ) : null}
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.address, searchText),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.pincode, searchText),
                  }}
                />
              </div>
            ))}
          </>
        ) : (
          <div>
            <h4>{"No User Found"}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
