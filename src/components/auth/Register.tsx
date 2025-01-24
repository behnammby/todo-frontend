import { useForm } from "react-hook-form";
import api from "../../services/api";
import styles from "./Register.module.css";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    try {
      await api.post("/auth/register", data);
      // alert("Registration successful, please login.");

      toast.success("Registration successful, you may now login");

      navigate("/login");
    } catch (error) {
      // console.error("Registration failed: ", error);

      toast.error("Registration failed");
    }
  }

  return (
    <div className={styles["register-container"]}>
      <form
        className={styles["register-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input {...register("username")} placeholder="Username" required />

        <input {...register("email")} placeholder="Email" required />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <div className={styles["foot-note"]}>
        Already a member?{" "}
        <NavLink to="/login" end>
          Login
        </NavLink>
      </div>
    </div>
  );
}
