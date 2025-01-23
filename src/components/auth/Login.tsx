import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import api from "../../services/api";

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await api.post<{ token: string }>("/auth/login", data);
      login(response.data.token);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" required />

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
