import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const onSubmit = async (data: RegisterForm) => {
    setError("");
    try {
      await axios.post(
        "http://localhost:3000/api/users/register",
        data,
        { withCredentials: true }
      );
=======

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", data);
      console.log(res.data);
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
      alert("Usuario registrado correctamente!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Crear Cuenta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-left font-semibold mb-1">Nombre completo</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tu nombre"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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
            Registrarme
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
=======
    <div  className="flex items-center justify-center min-h-screen flex-col gap-8">
      <h2 className="text-3xl animate-pulse">SIGN UP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex text-center flex-col">
        <div style={{ marginBottom: "15px" }}>
          <label>Nombre:</label>
          <input
            type="text"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            {...register("name", { required: "El nombre es obligatorio"})}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            {...register("email", { required: "El email es obligatorio" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            className="p-2 border rounded-lg bg-gray-300 text-black"
            {...register("password", { required: "La contraseña es obligatoria" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="bg-blue-400 p-3 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500">
          Registrarse
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Do you already have an account? {" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Log in here
        </Link>
      </p>
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    </div>
  );
}