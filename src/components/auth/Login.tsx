import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import api from "../../services/api";
import styles from "./Login.module.css";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  email: string;
}

export function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await api.post<LoginResponse>("/auth/login", data);
      const { token, username, email } = response.data;

      login(token, username, email);
    } catch (error) {
      // console.error("Login failed: ", error);
      toast.error(`Login failed. Please check your credentials.`);
    }
  }

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" required />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <div className={styles["foot-note"]}>
        Not a member?{" "}
        <NavLink to="/register" end>
          Register
        </NavLink>
      </div>
    </div>
  );
}
