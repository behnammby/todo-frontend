import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb";
import { SortOrder } from "../../types/sort.order";

interface SortProps {
  sort: SortOrder;
  onClick: () => void;
}

export default function SortButton({ sort, onClick }: SortProps) {
  return (
    <button
      title="Sort"
      type="button"
      className="text-3xl cursor-pointer hover:text-amber-400 p-2 m-3"
      onClick={onClick}
    >
      {sort === "asc" ? <TbSortAscending2 /> : <TbSortDescending2 />}
    </button>
  );
}
