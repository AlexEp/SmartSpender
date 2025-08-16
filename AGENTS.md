# Hello, Jules!

This document contains a set of rules and guidelines to help you work with the **SmartSpender** codebase. Please read it carefully and adhere to these guidelines to ensure the quality and consistency of the code.

## Project Structure

The SmartSpender application is built using a classic N-tier architecture. It's divided into three main projects:

-   **`SmartSpender.DAL` (Data Access Layer):** This is the data-centric part of the application.
    -   **Responsibilities:** All database-related operations, such as querying and saving data.
    -   **Key Components:**
        -   `Models/`: Contains the Entity Framework Core DbContext (`LlmfinanceContext`) and the database entities.
        -   `Repositories/`: Generic repository pattern for basic CRUD operations.
        -   `Services/`: Services that interact with the repositories to provide data to the business logic layer.
        -   `DTOs/`: Data Transfer Objects used to transfer data between layers.
-   **`SmartSpender.BE` (Business Logic Layer):** This is the core of the application.
    -   **Responsibilities:** Implementing the business rules and logic of the application. It acts as a bridge between the API and the DAL.
    -   **Key Components:**
        -   `Services/`: Contains services that implement the business logic.
-   **`SmartSpender.API`:** The presentation layer of the application.
    -   **Responsibilities:** Exposing the application's functionality as a RESTful API. It should not contain any business logic.
    -   **Key Components:**
        -   `Controllers/`: ASP.NET Core controllers that handle incoming HTTP requests, call the appropriate services in the BE layer, and return the results.

## Development Guidelines

### Adding a New Feature

When adding a new feature, you should generally follow these steps:

1.  **DAL:**
    -   If the feature requires a new database entity, add it to the `Models/Entities` directory.
    -   Update the `LlmfinanceContext` to include the new entity.
    -   If the new entity requires a new DTO, add it to the `DTOs` directory.
    -   If the new entity requires a new service, add a new service and interface to the `Services` directory.
2.  **BE:**
    -   If the new feature requires new business logic, add a new service to the `Services` directory.
3.  **API:**
    -   Add a new controller to the `Controllers` directory to expose the new feature.
    -   The controller should use the services from the BE layer to perform the required operations.

### Coding Conventions

-   Follow the existing coding style.
-   Use meaningful names for variables, methods, and classes.
-   Keep methods short and focused on a single responsibility.

### Database

The application uses a SQL Server database named `LLMFinance`. The connection string is currently hardcoded in `SmartSpender.DAL/Models/LlmfinanceContext.cs`. This is not ideal and should be moved to `appsettings.json` in the future.

When making changes to the database schema, you should use Entity Framework Core migrations to update the database.

## Final Note

These guidelines are here to help you. As you work on the project, you may find that some of them need to be adjusted or expanded. Use your best judgment and feel free to propose changes to these guidelines if you think they can be improved.
