import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//  Define el tipo del formulario
type LoginForm = {
  email: string;
  password: string;
};

//  Props que recibe el componente
type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

//  Configurar axios globalmente (solo una vez)
axios.defaults.baseURL = "http://localhost:3000/api/users/login";
axios.defaults.withCredentials = true;

export default function LoginPage({ setLoggedIn }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  Manejador de envío del formulario
  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const res = await axios.post("/login", data);
      console.log(" Respuesta backend:", res.data);

      if (res.data.user) {
        alert(`Inicio de sesión exitoso, bienvenido ${res.data.user.name}!`);
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(res.data.user)); // guardamos datos del usuario
        navigate("/dashboard");
      } else {
        setError("Error inesperado al iniciar sesión");
      }
    } catch (err: any) {
      console.error(" Error login:", err);
      const backendMessage = err.response?.data?.message || "Correo o contraseña incorrectos";
      setError(backendMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-8">
      <h2 className="text-3xl animate-pulse">SIGN IN</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex text-center flex-col">
        {/* EMAIL */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
              minLength: { value: 5, message: "Email demasiado corto" },
              maxLength: { value: 50, message: "Email demasiado largo" },
            })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            placeholder="Password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        {/* ERROR */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-blue-400 p-3 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500"
        >
          LOG IN
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline hover:text-blue-400">
          Sign up Here
        </Link>
      </p>
    </div>
  );
}
