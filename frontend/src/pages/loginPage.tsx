import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

<<<<<<< HEAD
=======
//  Define el tipo del formulario
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
type LoginForm = {
  email: string;
  password: string;
};

<<<<<<< HEAD
=======
//  Props que recibe el componente
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

<<<<<<< HEAD
export default function LoginPage({ setLoggedIn }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        data,
        { withCredentials: true }
      );

      if (res.data && res.data.user) {
        alert(`Inicio de sesión exitoso, bienvenido ${res.data.user.name}!`);
        setLoggedIn(true);
=======
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
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
        navigate("/dashboard");
      } else {
        setError("Error inesperado al iniciar sesión");
      }
    } catch (err: any) {
<<<<<<< HEAD
      console.error("Error al iniciar sesión:", err);
      const backendMessage =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? "Usuario no encontrado"
          : "Correo o contraseña incorrectos");
=======
      console.error(" Error login:", err);
      const backendMessage = err.response?.data?.message || "Correo o contraseña incorrectos";
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
      setError(backendMessage);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-left font-semibold mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ejemplo@email.com"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-left font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
=======
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
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
