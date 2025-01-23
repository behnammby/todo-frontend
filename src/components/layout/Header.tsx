import { useNavigate } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or user session
    localStorage.removeItem("token"); // Replace with your actual token key
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <h1 className={styles["title"]}>Todo App</h1>
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
