import React, { useEffect, useState, useRef } from "react";

const Message = () => {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const initialMessages = [
    {
      sender: { fullName: "Koushik S R", employeeId: "qugates-04" },
      content: "testng",
      createdAt: "2024-11-09T10:41:48.298Z",
      _id: "672f3c6c73e3f13eeaa4c92e",
    },
    {
      sender: { fullName: "Koushik S R", employeeId: "qugates-04" },
      content: "testing",
      createdAt: "2024-11-09T10:41:51.403Z",
      _id: "672f3c6f73e3f13eeaa4c943",
    },
    {
      sender: { fullName: "Koushik S R", employeeId: "qugates-04" },
      content: "testing",
      createdAt: "2024-11-09T10:41:54.289Z",
      _id: "672f3c7273e3f13eeaa4c958",
    },
    {
      sender: { fullName: "Niroj Shah", employeeId: "qugates-05" },
      content: "sss",
      createdAt: "2024-11-09T10:42:15.899Z",
      _id: "672f3c8773e3f13eeaa4c987",
    },
    {
      sender: { fullName: "Niroj Shah", employeeId: "qugates-05" },
      content: "ss",
      createdAt: "2024-11-09T10:42:33.508Z",
      _id: "672f3c9973e3f13eeaa4c99c",
    },
    {
      sender: { fullName: "Koushik S R", employeeId: "qugates-04" },
      content: "testing",
      createdAt: "2024-11-09T10:42:49.557Z",
      _id: "672f3ca973e3f13eeaa4c9d4",
    },
    {
      sender: { fullName: "Niroj Shah", employeeId: "qugates-05" },
      content: "testing",
      createdAt: "2024-11-09T10:43:31.425Z",
      _id: "672f3cd373e3f13eeaa4ca62",
    },
    {
      sender: { fullName: "Koushik S R", employeeId: "qugates-04" },
      content: "test",
      createdAt: "2024-11-09T10:44:00.087Z",
      _id: "672f3cf073e3f13eeaa4ca91",
    },
  ];

  // Add messages in chunks of 5 when scrolling to the top
  const addMessages = () => {
    const newMessages = initialMessages;
    setDisplayedMessages((prevMessages) => [...newMessages, ...prevMessages]);
    setMessageIndex((prevIndex) => prevIndex + 5);
  };

  useEffect(() => {
    // Initially load the first 5 messages
    addMessages();
  }, []);

  // Handle the scroll event to load more messages when the user scrolls to the top
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer.scrollTop <= 0) {
        addMessages(); // Add new messages only if scrolled to the top
      }
    };

    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messageIndex]);

  return (
    <div
      style={{
        height: "60%",
        width: "40%",
        border: "1px solid blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        ref={scrollContainerRef}
        style={{
          width: "70%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
          overflowY: "scroll",
          gap: "10px",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          flexDirection: "column-reverse",
        }}
      >
        {displayedMessages.map((message, index) => (
          <div
            key={message._id}
            style={{
              height: "50px",
              width: "100%",
              border: "1px solid blue",
              background: index === 0 ? "blue" : "none",
            }}
          >
            <p style={{ textAlign: "center" }}>
              {message.sender.fullName}: {message.content}
            </p>
          </div>
        ))}
      </div>

      <button onClick={addMessages}>Add More Messages</button>
    </div>
  );
};

export default Message;
