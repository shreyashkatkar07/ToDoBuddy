/* eslint-disable react/display-name */
import React from "react";

export const Navbar = React.memo(() => {
  console.log("Navbar rendered");
  return (
    <nav className="bg-violet-800 px-3 py-1.5">
      <div className="flex gap-10 my-auto">
        <img
          src="../favicon/android-chrome-192x192.png"
          alt="logo"
          className="w-[4%] rounded-full min-w-12"
        />
        <ul className="list-none flex gap-5 my-auto">
          <li className="text-white text-xl hover:font-semibold mx-2">
            <a href="/">Home</a>
          </li>
          <li className="text-white text-xl hover:font-semibold mx-2">
            <a href="/">About us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
});
