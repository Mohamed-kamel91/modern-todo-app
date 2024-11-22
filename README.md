# Task Manager App

A simple and intuitive task management application built with React, React Query, TypeScript, and styled using Tailwind CSS. This app provides tabs to organize tasks into All Tasks, Active Tasks, and Completed Tasks, automatically sorted by the newest first.

## Features

- 📝 **Task Management**: Add, edit, delete, and mark tasks as completed.
- 📂 **Tabbed Organization**: View tasks in tabs for All Tasks, Active Tasks, and Completed Tasks.
- 🔄 **Real-Time Updates**: Powered by React Query for efficient and real-time state management.
- 🌟 **Type Safety**: Fully typed with TypeScript to ensure robust and maintainable code.
- 🎨 **Modern Design**: Styled with Tailwind CSS for a clean and responsive UI.

## Technologies Used

- **React**: For building the user interface.
- **React Query**: For fetching and synchronizing data.
- **React Toolkit**: For Global state management.
- **Axios**: promise-based HTTP Client for node.js and the browser.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For modern styling.
- **JSON Server**: REST API using a simple JSON file as a database.

## Installation

### Prerequisites

- Node.js (v22.9.0 or higher)
- npm only

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/isOmarDev/todoList-modern-stack.git
   cd task-manager-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variable:

   ```env
   REACT_APP_API_URL=<your-api-url>
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   The app will be accessible at [http://localhost:5000](http://localhost:5000).

## Project Structure

Most of the code lives in the `src` folder and looks something like this:

```sh
src
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- App.tsx       # main application component
|   +-- AppProvider.tsx  # application provider that wraps the entire application with different global providers - this      might also differ based on meta framework used
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- testing           # test utilities and mocks
|
+-- utils             # shared utility functions
```

For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated. This approach helps prevent mixing feature-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, you can enhance collaboration, readability, and scalability in the application's architecture.

A feature could have the following structure:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- layout      # layouts scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

## Scripts

- `npm run dev`: Start the app in development mode.
- `npm run build`: Build the app for production.
- `npm run test`: Run tests once.
- `npm run test:watch`: Run tests and keep watch.
