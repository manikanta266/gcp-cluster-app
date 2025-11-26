import type { FC } from "react";

interface Props {
  id: number;
  name: string;
  email: string;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: FC<Props> = ({ name, email, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border hover:shadow-xl transition-all">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>

      <div className="flex gap-3 mt-3">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
