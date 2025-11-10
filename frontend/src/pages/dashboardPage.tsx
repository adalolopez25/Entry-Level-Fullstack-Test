<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
=======
// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be

type User = {
  id: number;
  name: string;
  email: string;
<<<<<<< HEAD
=======
  password?: string;
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
};

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPage({ setLoggedIn }: Props) {
  const [user, setUser] = useState<User | null>(null);
<<<<<<< HEAD
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        setLoggedIn(false);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate, setLoggedIn]);

  const handleUpdate = async () => {
    setMessage("");
    try {
      const body: any = { name, email };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const res = await axios.put(
        "http://localhost:3000/api/users/profile",
        body,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setMessage("Perfil actualizado correctamente");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error al actualizar");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      setLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
      {/* SALUDO PROFESIONAL */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Bienvenido, <span className="text-blue-800">Sr. {user.name.split(" ")[0]}</span>
        </h1>
        <p className="text-gray-600 text-sm">Gestione su información personal con total seguridad.</p>
      </div>

      {/* FORMULARIO DE ACTUALIZACIÓN */}
      <div className="space-y-5">
        <div>
          <label className="block text-left font-semibold mb-1">Nombre completo</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label className="block text-left font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-left font-semibold mb-1">
            Contraseña actual <span className="text-xs text-gray-500">(requerida para cambiarla)</span>
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-left font-semibold mb-1">Nueva contraseña</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {message && (
          <p className={`text-center font-semibold text-sm ${message.includes("correctamente") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={handleUpdate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* FOOTER PROFESIONAL */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>© 2025 Gases del Caribe | Plataforma de Clientes</p>
      </div>
    </div>
  </div>
);
}
=======
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserData(parsedUser.id);
    } else {
      setLoggedIn(false);
      location.href = "/login";
    }
  }, []);

  const fetchUserData = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${user?.id}`,
        {
          name: user?.name,
          email: user?.email,
          password: user?.password,
        },
        { withCredentials: true }
      );
      alert("Información actualizada correctamente");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.confirm('Do you want close your account?')
    setLoggedIn(false);
    location.href = "/login";
  };

  if (loading) return <p className="text-center text-2xl mt-10">Cargando...</p>;

  return (
    <div className="flex items-center justify-center flex-col grow sm-h-3xl sm:flex sm:flex-col gap-15">
      <h1 className="text-center text-5xl">Welcome Mr. {user?.name}</h1>

      <section className="flex flex-col items-center justify-center mt-10">
        <h2 className="mb-10 bg-gray-200 p-10 w-2xl text-center text-black text-3xl rounded-lg">
          My Information
        </h2>

        {user && (
          <div className="flex flex-col gap-5 items-center justify-center">
            <input
              className="p-2 border rounded-lg bg-gray-300 text-black"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Name"
            />
            <input
              className="p-2 border rounded-lg bg-gray-300 text-black"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Email"
            />
            <input
              className="p-2 border rounded-lg bg-gray-300 text-black"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Password"
              type="password"
            />

            {editMode ? (
              <button
                className="bg-blue-400 p-5 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-green-400 p-5 border-none rounded-lg text-white cursor-pointer hover:bg-green-500"
                onClick={() => setEditMode(true)}
              >
                Edit Information
              </button>
            )}
          </div>
        )}
      </section>

      <div className="absolute left-0 top-0 p-5 sm:right-0 sm:top-0">
        <button
          className="bg-red-400 hover:bg-red-500 p-3 border rounded-lg text-white cursor-pointer hover:bg-blue-500"
          onClick={handleLogout}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
