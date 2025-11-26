import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  // Use environment variable or fallback
  const API_URL = import.meta.env.VITE_API_URL || "http://34.42.152.240";

  const loadUsers = async () => {
    try {
      console.log("Fetching users from:", `${API_URL}/users`);
      const res = await axios.get<User[]>(`${API_URL}/users`);
      console.log("Users fetched:", res.data);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsers([]); // fallback to empty array
    }
  };

  const deleteUser = async (id: number) => {
    try {
      console.log("Deleting user ID:", id);
      await axios.delete(`${API_URL}/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.length > 0 ? (
        users.map((u) => (
          <UserCard
            key={u.id}
            id={u.id}
            name={u.name}
            email={u.email}
            onEdit={() => (window.location.href = `/edit/${u.id}`)}
            onDelete={() => deleteUser(u.id)}
          />
        ))
      ) : (
        <p className="text-center col-span-full">No users found.</p>
      )}
    </div>
  );
}
