"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const TextInput = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const { day } = useParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Fetch tasks for this day from backend
  useEffect(() => {
    if (!user || !day) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/${user.user_id}/tasks/${day}`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [user, day]);

  if (loading || loadingTasks) {
    return <div>Loading...</div>;
  }
  if (!user) return null;

  const buttonClick = async () => {
    if (inputText.trim() === "") {
      return alert("Please enter a task!");
    }

    try {
      const res = await fetch(`${API_BASE}/users/${user.user_id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, task: inputText.trim() }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setInputText("");
    } catch (err) {
      console.error(err);
      alert("Could not add task. Try again.");
    }
  };

  const buttonDel = async (taskId) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error(err);
      alert("Could not delete task. Try again.");
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();
      setTasks(
        tasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error(err);
      alert("Could not update task. Try again.");
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString();
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 w-full p-4 md:p-6">
        {/* Left Side */}
        <div className="w-full lg:w-[35%]
        
        ">
          <div className="flex flex-col gap-4">
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your task..."
              className="w-full rounded-xl border border-gray-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-44"
            />

            <button
              onClick={buttonClick}
              className="w-full sm:w-fit self-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-md transition hover:bg-blue-700"
            >
              Add To List
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[65%]">
          <h2 className="mt-2 mb-3 text-xl font-bold text-black dark:text-white">
            Tasks to be completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            {tasks
              .filter((task) => !task.complete_time)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={!!task.complete_time}
                      onChange={() => toggleComplete(task.id)}
                      className="h-5 w-5 accent-green-500 cursor-pointer"
                    />

                    <p className="text-gray-800 dark:text-white wrap-break-words">{task.task}</p>
                  </div>

                  <button
                    onClick={() => buttonDel(task.id)}
                    className="ml-3 shrink-0 rounded-lg bg-red-500 px-3 py-2 text-white shadow hover:bg-red-600 transition"
                  >
                    🗑️
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mt-2 mb-3 mx-3 text-xl font-bold text-black dark:text-white">
          Completed Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 my-4">
        {tasks
          .filter((task) => task.complete_time)
          .map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!task.complete_time}
                  onChange={() => toggleComplete(task.id)}
                  className="h-5 w-5 accent-green-700 dark:accent-green-500 cursor-pointer"
                />

                <div>
                  <p className="text-green-700 dark:text-green-300 line-through">{task.task}</p>
                  <p className="text-green-600 dark:text-green-300 text-sm">
                    Completed: {formatTime(task.complete_time)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => buttonDel(task.id)}
                className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextInput;