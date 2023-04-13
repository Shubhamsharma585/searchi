import React, { useState, useEffect } from "react";

function SearchResults({ relatedResults, searchText }) {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

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

  useEffect(() => {
    const handleMouseMove = () => {
      setCursorVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setCursorVisible(false);
      if (event.keyCode === 38 && highlightedIndex > 0) {
        // Up arrow key
        setHighlightedIndex(highlightedIndex - 1);
      } else if (
        event.keyCode === 40 &&
        highlightedIndex < relatedResults.length - 1
      ) {
        // Down arrow key
        setHighlightedIndex(highlightedIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex]);

  return (
    <>
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
            {relatedResults?.map((item, index) => (
              <div
                key={item.id}
                style={{
                  border: "3px solid black",
                  cursor: cursorVisible ? "auto" : "none",
                  backgroundColor:
                    highlightedIndex === index ? "yellowgreen" : "white",
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseMove={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
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
        ) : (
          <div>
            <h4>{"No User Found"}</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResults;
