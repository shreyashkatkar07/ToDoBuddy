/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import axios from "axios";
import { useCallback } from "react";

export const CreateTodo = React.memo(
  ({ fetchTodos, titleRef, descRef, hideAddbtn, setHideAddBtn }) => {
    console.log("CreateTodo rendered");
    const addTodo = useCallback(async () => {
      try {
        if (titleRef.current.value.length > 35) {
          alert(
            "The title exceeds the maximum allowed length of 35 characters."
          );
          return;
        }
        const response = await axios.post(
          "http://localhost:3000/createTodo",
          {
            title: titleRef.current.value,
            description: descRef.current.value,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.data) {
          alert("Todo created successfully.");
          titleRef.current.value = "";
          descRef.current.value = "";
          fetchTodos();
        } else {
          alert("Failed to create todo. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          alert(`Server responded with status: ${error.response.status}`);
        } else if (error.request) {
          alert(
            "No response received from server. Please check your network connection."
          );
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    }, [fetchTodos, titleRef, descRef]);

    const updateTodo = useCallback(async () => {
      try {
        const resp = await axios.put(
          "http://localhost:3000/editTodo",
          {
            _id: titleRef.current.todoId,
            title: titleRef.current.value,
            description: descRef.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (resp.data) {
          alert("Todo edited successfully.");
          titleRef.current.value = "";
          descRef.current.value = "";
          titleRef.current.todoId = null;
          setHideAddBtn(false);
          fetchTodos();
        } else {
          alert("Failed to edit todo. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          alert(`Server responded with status: ${error.response.status}`);
        } else if (error.request) {
          alert(
            "No response received from server. Please check your network connection."
          );
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    }, [fetchTodos, titleRef, descRef, setHideAddBtn]);

    return (
      <div>
        <div>
          <div className="flex justify-center my-2 ">
            <label
              htmlFor="title"
              className="my-auto text-xl font-bold text-violet-900"
            >
              Title:
            </label>
            <input
              className="p-2.5 m-2.5 rounded-lg  hover:shadow-md bg-violet-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-900"
              type="text"
              placeholder="Enter title here..."
              ref={titleRef}
              id="title"
            />
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="desc"
              className="my-auto mx-1 text-xl font-bold text-violet-900"
            >
              Description:
            </label>
            <textarea
              className="p-2.5 m-2.5 rounded-lg  hover:shadow-md bg-violet-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-900"
              id="desc"
              name="desc"
              rows={3}
              cols={50}
              placeholder="Enter description here..."
              ref={descRef}
            />
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-5">
          <button
            className={`bg-violet-800 hover:bg-violet-400 shadow-lg rounded-2xl px-5 py-2.5 text-white hover:text-violet-950 hover:border-2 hover:border-violet-800 ${
              hideAddbtn ? "hidden" : "visible"
            } `}
            onClick={addTodo}
          >
            Add todo
          </button>
          <button
            className={`bg-violet-800 hover:bg-violet-400 shadow-lg rounded-2xl px-5 py-2.5 text-white hover:text-violet-950 hover:border-2 hover:border-violet-800 ${
              hideAddbtn ? "visible" : "hidden"
            }`}
            onClick={updateTodo}
          >
            Update todo
          </button>
        </div>
      </div>
    );
  }
);
