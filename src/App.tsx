// src/App.tsx
import React, { type JSX } from "react";
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <div className="app-root">
      <Navbar />
      <main style={{ padding: 20 }}>
        <AppRoutes />
      </main>
    </div>
  );
}
