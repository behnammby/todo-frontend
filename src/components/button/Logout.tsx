import { TbLogout2 } from "react-icons/tb";

interface Props {
  onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  return (
    <button
      title="Logout"
      className="text-3xl cursor-pointer hover:text-amber-400"
      type="button"
      onClick={onClick}
    >
      <TbLogout2 />
    </button>
  );
}
