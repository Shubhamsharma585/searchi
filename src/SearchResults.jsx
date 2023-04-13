import React from "react";

function SearchResults({ relatedResults, searchText }) {
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
    <>
      {relatedResults?.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "3px solid black",
          }}
        >
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
  );
}

export default SearchResults;
