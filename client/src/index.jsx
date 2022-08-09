// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return <h1>Hello World</h1>
}

root.render(<App />);
