import React, { useEffect, useState, useRef } from "react";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const scrollContainerRef = useRef(null); // Reference to the scroll container

  const addMessagesToTop = () => {
    const newMessages = [];
    for (let i = messages.length; i < messages.length + 20; i++) {
      newMessages.unshift(i); // Add new messages at the beginning
    }

    // Get the current scroll height before adding new messages
    const scrollHeightBeforeLoad = scrollContainerRef.current.scrollHeight;

    setMessages((prevMessages) => [...newMessages, ...prevMessages]);

    // Adjust scroll position after adding new messages to keep the view in place
    setTimeout(() => {
      const scrollHeightAfterLoad = scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTop +=
        scrollHeightAfterLoad - scrollHeightBeforeLoad;
    }, 0);
  };

  useEffect(() => {
    // Initialize with the first 20 numbers on mount
    const initialMessages = Array.from({ length: 20 }, (_, i) => i);
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (loadMore) {
      addMessagesToTop();
      setLoadMore(false); // Reset loadMore state after loading
    }
  }, [loadMore]);

  const handleScroll = () => {
    // Trigger loadMore when scrolled to the top
    if (scrollContainerRef.current.scrollTop === 0) {
      setLoadMore(true);
    }
  };

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
        onScroll={handleScroll}
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
        }}
      >
        {messages.map((val, key) => (
          <div
            key={key}
            style={{
              height: "50px",
              width: "100%",
              border: "1px solid blue",
              background: key === 0 ? "blue" : "none",
            }}
          >
            <p style={{ textAlign: "center" }}>{val}</p>
          </div>
        ))}
      </div>

      <button onClick={addMessagesToTop}>Add More Messages</button>
    </div>
  );
};

export default Message;
