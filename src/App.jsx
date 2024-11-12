import React from "react";
import Message from "./component.jsx/Message";

const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Message />
    </div>
  );
};

export default App;
