// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  userId: number;
};

type Props = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardPage({setLoggedIn} : Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>("Usuario");

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Usuario";
    setUserName(storedName);

    fetchUsers();
    fetchTasks();
  }, []);

  // Usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", { withCredentials: true });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/register", {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
      }, { withCredentials: true });
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, { withCredentials: true });
      window.confirm('Are you sure ?')
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks", { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post("http://localhost:3000/api/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      }, { withCredentials: true });
      setNewTaskTitle("");
      setNewTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    location.href = '/login'
  }

  return (
    <div className="flex items-center justify-center flex-col grow sm-h-3xl sm:flex sm:flex-col gap-15 ">
      <h1 className="text-center text-5xl ">Bienvenido Sr. {userName}</h1>

      {/* Usuarios */}
      <section className="flex flex-col items-center justify-center">
        <h2 className="mb-10 bg-gray-200 p-10 w-2xl text-center text-black text-3xl rounded-lg">Usuarios</h2>
        <div className="flex items-center  justify-center flex-col gap-5">
          <input  className="p-2 border rounded-lg bg-gray-300 text-black" placeholder="Nombre" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          <input  className="p-2 border rounded-lg bg-gray-300 text-black" placeholder="Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
          <input  className="p-2 border rounded-lg bg-gray-300 text-black" placeholder="Contraseña" value={newUserPassword} type="password" onChange={(e) => setNewUserPassword(e.target.value)} />
          <button className="bg-blue-400 p-5 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500" onClick={addUser}>Agregar Usuario</button>
        </div>
        <br /><br />
          <h2 className="text-center mb-5 text-2xl">User List</h2>
        <ul className="flex gap-5">
          {users.map(user => (
            <li key={user.id} className="border p-12 md:p-8  rounded-lg bg-gray-200">
              {user.name} ({user.email}){" "}
              <div className="flex flex-col mt-5">
              <button className="bg-red-400 hover:bg-red-500 p-3 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500" onClick={() => deleteUser(user.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Tasks */}
      <section>
        <h2 className="text-center mb-5 text-2xl">Task</h2>
        <div className="flex flex-col items-center justify-center gap-5 border p-5 h-80 w-xm rounded-lg">
          <input className="p-5 border rounded-lg bg-gray-300 text-black" placeholder="Título" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
          <input className="p-5 border rounded-lg bg-gray-300 text-black" placeholder="Descripción" value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
          <button className="bg-blue-400 p-5 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500" onClick={addTask}>Agregar Tarea</button>
        </div>
        <br /><br />
        <ul className="flex gap-5">
          {tasks.map(task => (
            <li key={task.id} className="border-1 p-12 rounded-lg bg-gray-200">
              {task.title} - {task.description}{" "}
              <div className="flex flex-col mt-5">
              <button  className="bg-red-400 hover:bg-red-500 p-3 border-none rounded-lg text-white cursor-pointer hover:bg-blue-500" onClick={() => deleteTask(task.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className="absolute left-0 top-0 p-5 sm:right-0 sm:top-0">
      <button className="bg-red-400 hover:bg-red-500 p-3 border rounded-lg text-white cursor-pointer hover:bg-blue-500" onClick={handleLogout}>LOG OUT</button>
      </div>
    </div>
  );
}