# ToDoBuddy

ToDoBuddy is a full-stack web application built using the MERN stack and styled with Tailwind CSS to ensure responsiveness. It includes features for managing todos with validation, CRUD operations, and search functionality.

## Features

1. **Add Todo:**
   - Users can enter a title and description in respective input boxes and click on the "Add Todo" button to create a new todo item.

2. **Mark Todo as Complete:**
   - Each todo item can be marked as complete.

3. **Edit Todo:**
   - Users can edit the title and description of an existing todo item. Changes are reflected by clicking the "Update Todo" button.

4. **Mark as Incomplete:**
   - Completed todos can be marked as incomplete.

5. **Delete Todo:**
   - Users have the option to delete a particular todo item.

6. **Expand Todo Description:**
   - If the description of a todo item exceeds a certain length, users can click to expand the description. This opens a modal dialog in the center of the screen displaying the complete title and description of the todo, with a close button to dismiss the modal.

7. **Filter Todos by Title:**
   - Todos can be filtered by title using a search box, allowing users to quickly find specific todos.

## Technologies Used

- **Frontend:** Vite + React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (with Mongoose for ORM)
- **Validation:** Zod for input validation
- **Data Fetching:** Axios for fetching data from the backend API

## Getting Started

To run ToDoBuddy locally:

1. Clone this repository.
2. Navigate to the project directory in your terminal: `cd ToDoBuddy`.

### Setting Up Backend

3. Open a new terminal window or tab.
4. Navigate to the backend directory: `cd backend`.
5. Install backend dependencies: `npm install`.
6. Set up your MongoDB database and update the connection string in the backend.
7. Start the backend server: `node index.js`.

### Setting Up Frontend

8. Open another new terminal window or tab (still in the project directory `ToDoBuddy`).
9. Navigate to the frontend directory: `cd frontend`.
10. Install frontend dependencies: `npm install`.
11. Start the frontend development server: `npm run dev`.

12. Open your browser and visit `http://localhost:5173`.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or create a pull request.
