// Bring React in to build a component.
import React from 'react';
import App from './components/App.jsx'
import css from './style.css'

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

root.render(<App />);
