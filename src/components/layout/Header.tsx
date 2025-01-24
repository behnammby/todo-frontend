import { TbUser } from "react-icons/tb";
import LogoutButton from "../button/Logout";
import { useAuth } from "../../context/AuthProvider";

export function Header() {
  const { username, logout } = useAuth();

  return (
    <div className="flex flex-row mb-3 justify-end items-center px-3">
      {/* <div className="flex justify-start items-center">
        <TbUser className="text-lg mr-2" />
        <div className="uppercase">{username}</div>
      </div> */}
      <TbUser className="text-lg mr-2" />
      <div className="uppercase mr-3">{username}</div>
      <LogoutButton onClick={logout} />
    </div>
  );
}
