import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface UserForm {
  name: string;
  email: string;
}

export default function EditUser() {
  const { id } = useParams<{ id: string }>(); // get ID from URL
  const [form, setForm] = useState<UserForm>({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL; // make sure VITE_API_URL is set in .env
  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          setError("User ID not found in URL.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/users/${id}`);
        if (res.data) {
          setForm({
            name: res.data.name || "",
            email: res.data.email || "",
          });
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Update user
  const updateUser = async () => {
    try {
      if (!id) {
        alert("Invalid user ID");
        return;
      }
      await axios.put(`${API_URL}/users/${id}`, form);
      alert("User updated successfully!");
      window.location.href = "/"; // go back to user list
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };

  if (loading) return <p className="container mx-auto p-6">Loading user data...</p>;
  if (error) return <p className="container mx-auto p-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <div className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          onClick={updateUser}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
