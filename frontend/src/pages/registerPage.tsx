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


  const onSubmit = async (data: RegisterForm) => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", data);
      console.log(res.data);
      alert("Usuario registrado correctamente!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div  className="flex items-center justify-center min-h-screen flex-col gap-8">
      <h2 className="text-3xl animate-pulse">SIGN UP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex text-center flex-col">
        <div style={{ marginBottom: "15px" }}>
          <label>Nombre:</label>
          <input
            type="text"
            className="p-2 border-1 rounded-lg bg-gray-300 text-black"
            {...register("name", { required: "El nombre es obligatorio"})}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            className="p-2 border-1 rounded-lg bg-gray-300 text-black"
            {...register("email", { required: "El email es obligatorio" })}
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            className="p-2 border-1 rounded-lg bg-gray-300 text-black"
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
    </div>
  );
}