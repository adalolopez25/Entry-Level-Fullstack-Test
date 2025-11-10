// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPage({ setLoggedIn }: Props) {
  const [user, setUser] = useState<User | null>(null);
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
