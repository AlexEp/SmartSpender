# Project Overview

This is a web application built with Angular. Based on the file structure and dependencies, it appears to be a single-page application (SPA) for managing and analyzing spending data. The application uses Chart.js for data visualization, which suggests that it provides features for displaying financial data in the form of charts.

The project is structured with a clear separation of components, services, and data transfer objects (DTOs). This indicates a well-organized and maintainable codebase. The use of TypeScript ensures type safety and better code quality.

# Building and Running

To work with this project, you need to have Node.js and the Angular CLI installed.

**1. Install Dependencies:**

```bash
npm install
```

**2. Run the Development Server:**

```bash
npm start
```

This will start a local development server. You can view the application by navigating to `http://localhost:4200/` in your web browser. The application will automatically reload if you change any of the source files.

**3. Build the Project:**

```bash
npm run build
```

This command will build the project for production. The build artifacts will be stored in the `dist/` directory.

**4. Run Unit Tests:**

```bash
npm test
```

This command will execute the unit tests using Karma and Jasmine.

# Development Conventions

*   **Code Style:** The project uses Prettier for code formatting. The configuration is defined in the `package.json` file.
*   **Components:** Components are organized in the `src/app/components` directory. Each component has its own folder with the HTML, SCSS, and TypeScript files.
*   **Services:** Services are located in the `src/app/services` directory. These services are likely used to handle business logic and data fetching.
*   **Data Transfer Objects (DTOs):** DTOs are defined in the `src/app/dtos` directory. These are used to define the shape of data exchanged between the client and the server.
*   **Routing:** The application's routes are defined in the `src/app/app.routes.ts` file.
