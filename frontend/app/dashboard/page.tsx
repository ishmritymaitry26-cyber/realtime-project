"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);
 const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to the Dashboard </h1>
      <p>Login successful!</p>

{/* <button onClick={handleLogout} */ }
      <button onClick={handleLogout}
      style={{marginTop: "20px", padding: "10px 20px", fontSize: "16px" , backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Logout
      </button>

    </div>
  );
}