import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [form, setForm] = useState({ name: "", email: "" });

  // Use environment variable or fallback
  const API_URL = import.meta.env.VITE_API_URL || "http://34.42.152.240";

  const submit = async () => {
    try {
      console.log("Posting to:", `${API_URL}/users`);
      const res = await axios.post(`${API_URL}/users`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", res.data);
      alert("User created successfully!");
      window.location.href = "/";
    } catch (err: any) {
      console.error("Error creating user:", err);
      alert("Failed to create user. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      <div className="space-y-4">
        <input
          placeholder="Name"
          className="border p-2 rounded w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
