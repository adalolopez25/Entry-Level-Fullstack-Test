import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginPage({ setLoggedIn }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("Inicio de sesión exitoso!");
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen flex-col gap-8"
    >
      <h2 className="text-3xl animate-pulse">SIGN IN </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex text-center flex-col">
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
              minLength: {
                value: 10,
                message: "Email must be at least 10 character",
              },
              maxLength: {
                value: 20,
                message: "Email tiene que tener maximo 20 caracteres",
              },
            })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            placeholder="Password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="bg-blue-400 p-3 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500">
          LOG IN
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't you have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline hover:text-blue-400"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
