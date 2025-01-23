import { useForm } from "react-hook-form";
import api from "../../services/api";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    try {
      await api.post("/auth/register", data);
      alert("Registration successful, please login.");
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
  );
}
