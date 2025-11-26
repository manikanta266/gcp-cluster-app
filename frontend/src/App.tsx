// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [form, setForm] = useState({ name: "", email: "" });

//   // Fetch users from Flask
//   useEffect(() => {
//     axios.get("http://localhost:5000/users").then((res) => {
//       setUsers(res.data);
//     });
//   }, []);

//   const addUser = () => {
//     axios
//       .post("http://localhost:5000/users", form)
//       .then(() => alert("User Added Successfully!"));
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>React + Flask + MySQL App</h1>

//       <h2>Add User</h2>

//       <input
//         style={{ marginRight: "10px" }}
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         style={{ marginRight: "10px" }}
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <button onClick={addUser}>Submit</button>

//       <h2>User List</h2>
//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>
//             {u.name} — {u.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}
