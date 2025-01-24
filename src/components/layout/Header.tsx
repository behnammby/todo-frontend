import { useAuth } from "../../context/AuthProvider";
import { SortOrder } from "../../types/sort.order";
import SortButton from "../button/Sort";
import Logout from "./Logout";

interface Props {
  sort: SortOrder;
  onSort: () => void;
}

export function Header({ sort, onSort }: Props) {
  const { username, logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b-2 border-b-gray-300 border-dashed">
      <h1 className="text-gray-800 font-bold text-xl uppercase">
        {username}'s To-Do
      </h1>
      <div className="flex items-center justify-end">
        <SortButton sort={sort} onClick={onSort} />
        <Logout onClick={logout} />
      </div>
    </div>
  );
}
