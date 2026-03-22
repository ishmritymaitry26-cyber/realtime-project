"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  { ssr: false }
);

const socket = io("http://localhost:5000");

export default function Editor() {
  const [code, setCode] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("code-update", (newCode: string) => {
      setCode(newCode);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-3xl font-bold text-center mb-6">
        Real-time Editor 🚀
      </h1>

      <div className="flex justify-center mb-4">
        <input
          className="border p-2 mr-2 rounded"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e: any) => setRoomId(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => socket.emit("join-room", roomId)}
        >
          Join
        </button>
      </div>

      <MonacoEditor
        height="500px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        options={{
            fontSize: 16,             //
            minimap: { enabled: false},
        }}
        onChange={(value) => {
          const newCode = value || "";
          setCode(newCode);

          socket.emit("code-change", {
            roomId,
            code: newCode,
          });
        }}
      />

    </div>
  );
}