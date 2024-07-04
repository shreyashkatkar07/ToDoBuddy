import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/RenderTodos";
import { Navbar } from "./components/Navbar";

const App = () => {
  console.log("App rendered");
  const [todos, setTodos] = useState([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [hideAddbtn, setHideAddBtn] = useState(false);

  const fetchTodos = useCallback(async () => {
    console.log("fetchTodos called");
    try {
      const response = await axios.get("http://localhost:3000/todos");
      console.log("Response received:", response);
      if (response.data && response.data.todos) {
        setTodos(response.data.todos);
      } else {
        console.error("Failed to fetch todos: No todos found in response");
      }
    } catch (error) {
      console.error("An error occurred while fetching todos:", error.message);
      if (error.code === "ECONNRESET") {
        console.error("Connection was reset. Retrying...");
        alert("Connection was reset. Retrying...");
        setTimeout(fetchTodos, 5000);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-violet-300 p-5">
        <h1 className="pt-5 pb-2 text-center text-4xl font-bold text-violet-950">
          ToDoBuddy - Manage your todos here
        </h1>
        <CreateTodo
          fetchTodos={fetchTodos}
          titleRef={titleRef}
          descRef={descRef}
          hideAddbtn={hideAddbtn}
          setHideAddBtn={setHideAddBtn}
        />
        <Todos
          todos={todos}
          fetchTodos={fetchTodos}
          titleRef={titleRef}
          descRef={descRef}
          setHideAddBtn={setHideAddBtn}
        />
      </div>
    </div>
  );
};

export default App;
