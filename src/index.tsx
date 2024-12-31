import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // グローバルなCSSのインポート
import App from "./App"; // ルートコンポーネント
import { BrowserRouter } from "react-router-dom"; // ルーティングをサポートする場合

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      
        <App />
      
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Ensure an element with id 'root' exists in your HTML.");
}
