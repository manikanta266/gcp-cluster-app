export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-200">Users</a>
          <a href="/create" className="hover:text-gray-200">Add User</a>
        </div>
      </div>
    </nav>
  );
}
