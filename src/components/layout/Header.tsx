// import { useNavigate } from "react-router";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthProvider";

export default function Header() {
  const { username, logout } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <h1 className={styles["title"]}>Todo App for {username}</h1>
        <button
          className={styles["logout-button"]}
          // style={logoutButtonStyle}
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
