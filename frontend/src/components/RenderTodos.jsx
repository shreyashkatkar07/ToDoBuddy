/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

export const Todos = React.memo(
  ({ todos, fetchTodos, titleRef, descRef, setHideAddBtn }) => {
    console.log("Todos component rendered");
    const [filterValue, setFilterValue] = useState("");
    const [expandedTodo, setExpandedTodo] = useState(null);
    const [overflowingTodos, setOverflowingTodos] = useState([]);
    const debouncedValue = useDebounce(filterValue, 500);

    useEffect(() => {
      fetchTodos();
    }, [fetchTodos]);

    const markAsCompleted = useCallback(
      async (todoId) => {
        try {
          const resp = await axios.put(
            "http://localhost:3000/markComplete",
            { _id: todoId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (resp.data) {
            alert("Todo marked as completed!");
            fetchTodos();
          } else {
            alert("Failed to mark as completed");
          }
        } catch (error) {
          console.error("Error marking todo as completed:", error);
          alert("Failed to mark as completed");
        }
      },
      [fetchTodos]
    );

    const markAsIncomplete = useCallback(
      async (todoId) => {
        try {
          const resp = await axios.put(
            "http://localhost:3000/markIncomplete",
            { _id: todoId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (resp.data) {
            alert("Todo marked as incomplete!");
            fetchTodos();
          } else {
            alert("Failed to mark as incomplete");
          }
        } catch (error) {
          console.error("Error marking todo as incomplete:", error);
          alert("Failed to mark as incomplete");
        }
      },
      [fetchTodos]
    );

    const setTodoForEdit = useCallback(
      (todo) => {
        titleRef.current.value = todo.title;
        descRef.current.value = todo.description;
        titleRef.current.todoId = todo._id;
        setHideAddBtn(true);
      },
      [titleRef, descRef, setHideAddBtn]
    );

    const deleteTodo = useCallback(
      async (todoId) => {
        try {
          const resp = await axios.put(
            "http://localhost:3000/deleteTodo",
            { _id: todoId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (resp.data) {
            alert("Todo deleted successfully!");
            fetchTodos();
          } else {
            alert("Failed to delete todo.");
          }
        } catch (error) {
          console.error("Error deleting todo:", error);
          alert("Failed to delete todo.");
        }
      },
      [fetchTodos]
    );

    const checkOverflow = useCallback((element) => {
      return element.scrollHeight > element.clientHeight;
    }, []);

    const handleOverflow = useCallback(
      (todo, todoDescRef) => {
        if (todoDescRef.current && checkOverflow(todoDescRef.current)) {
          setOverflowingTodos((prev) => [...prev, todo._id]);
        }
      },
      [checkOverflow]
    );

    useEffect(() => {
      todos.forEach((todo) => {
        const todoDescRef = document.getElementById(`desc-${todo._id}`);
        handleOverflow(todo, { current: todoDescRef });
      });
    }, [todos, handleOverflow]);

    const expandTodo = (todo) => {
      setExpandedTodo(todo);
    };

    const collapseTodo = () => {
      setExpandedTodo(null);
    };

    const filteredTodos = useMemo(() => {
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(debouncedValue.toLowerCase())
      );
    }, [todos, debouncedValue]);

    return (
      <div>
        <div className="flex justify-center my-5">
          <p className="my-auto mx-3 text-lg font-semibold text-violet-950">
            Filter Todos using Title :
          </p>
          <input
            type="text"
            placeholder="Search by title..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2.5 m-2.5 rounded-lg  hover:shadow-md bg-violet-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-900"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 max-w-screen mt-7 mx-3">
          {filteredTodos != null && filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="flex flex-col bg-violet-700 hover:bg-violet-900 text-white pt-2.5 rounded-xl shadow-2xl"
              >
                <div className="flex-grow px-5">
                  <h2
                    className={`text-xl font-semibold ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </h2>
                  <hr />
                  <div className="text-md my-2 h-[70px] overflow-hidden relative">
                    <p
                      id={`desc-${todo._id}`}
                      className={`line-clamp-2 ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.description}
                    </p>
                    {overflowingTodos.includes(todo._id) && (
                      <button
                        onClick={() => expandTodo(todo)}
                        className="text-blue-100 font-bold hover:underline cursor-pointer absolute bottom-0 right-0"
                      >
                        Expand
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-5 bg-violet-900 rounded-xl px-5 pt-3 pb-1">
                  <div className="my-auto">
                    {todo.completed && (
                      <button
                        onClick={() => markAsIncomplete(todo._id)}
                        className={`${!todo.completed ? "hidden" : "visible"}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <title>Mark as incomplete</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                        </svg>
                      </button>
                    )}
                    {!todo.completed && (
                      <button
                        onClick={() => markAsCompleted(todo._id)}
                        className={`${todo.completed ? "hidden" : "visible"}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <title>Mark as completed</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div>
                    <button onClick={() => setTodoForEdit(todo)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <title>Edit todo</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <button onClick={() => deleteTodo(todo._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <title>Delete todo</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No todos found</p>
          )}
        </div>
        {expandedTodo && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-violet-900 bg-opacity-75">
            <div className="bg-violet-700 hover:bg-violet-900 px-6 py-3 rounded-lg shadow-lg max-w-sm sm:max-w-xl w-full text-white">
              <h2
                className={`text-xl font-semibold ${
                  expandedTodo.completed ? "line-through" : ""
                }`}
              >
                {expandedTodo.title}
              </h2>
              <hr />
              <p
                className={`text-md my-2 ${
                  expandedTodo.completed ? "line-through" : ""
                }`}
              >
                {expandedTodo.description}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={collapseTodo}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
