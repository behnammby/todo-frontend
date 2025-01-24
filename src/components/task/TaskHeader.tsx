import { SortOrder } from "../../types/sort.order";
import SortButton from "../button/Sort";

interface Props {
  sort: SortOrder;
  onSort: () => void;
}

export function TaskHeader({ sort, onSort }: Props) {
  // const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b-2 border-b-gray-300 border-dashed">
      <h1 className="text-gray-800 font-bold text-xl uppercase">My To-Do</h1>
      <div className="flex items-center justify-end">
        <SortButton sort={sort} onClick={onSort} />
        {/* <LogoutButton onClick={logout} /> */}
      </div>
    </div>
  );
}
