# Project Overview

This is a full-stack web application designed to help users track their expenses. The project consists of a .NET backend and an Angular frontend. It also includes a background service for data processing and a desktop UI.

The project is structured as follows:
- **`SmartSpender.DAL.API`**: An ASP.NET Core Web API that exposes the application's functionality through a set of RESTful endpoints.
- **`SmartSpender.DAL.BL`**: A class library that contains the business logic of the application.
- **`SmartSpender.Core`**: A class library that contains the core entities, DTOs, and interfaces.
- **`SmartSpender.BE`**: A background worker service that performs data processing tasks.
- **`SmartSpender.UI`**: An Avalonia desktop application.
- **`SmartSpender.WEB`**: An Angular single-page application that provides the user interface for the application.
- **`SmartSpender.WEB.React`**: A React single-page application.

# Building and Running

To work with this project, you need to have Node.js, the Angular CLI, and the .NET 8 SDK installed.

## Backend (.NET)

To run the backend API, you can use the following command:

```bash
dotnet run --project SmartSpender.DAL.API
```

The API will be available at `http://localhost:3010`.

## Frontend (Angular)

To run the frontend application, navigate to the `SmartSpender.WEB` directory and run the following commands:

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
