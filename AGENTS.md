# Hello, Jules!

This document contains rules and guidelines for working with the **SmartSpender** codebase.

---

## Golden Rules

**These are the most important rules. You must follow them at all times.**

### 1. The API is ONLY for Database CRUD

The `SmartSpender.API` project has one and only one purpose: to expose the services from `SmartSpender.DAL` as HTTP endpoints.

-   **DO NOT** add any business logic to the API project.
-   **DO NOT** call any services other than those from the DAL.
-   The API controllers should be thin wrappers around the DAL services.

### 2. Branch Naming Convention

All branch names **MUST** follow this format: `{yymm}/feature/{some-description}`.

-   `yymm`: 2-digit year and 2-digit month (e.g., `2408`).
-   `feature`: The type of change.
-   `some-description`: A short, descriptive name in kebab-case.

**Example:** `2408/feature/add-user-authentication`

---

## Project Structure

The SmartSpender application is composed of three main projects:

-   **`SmartSpender.DAL` (Data Access Layer):** The data-centric part of the application.
    -   **Responsibilities:** All database-related operations.
    -   **Key Components:** `Models`, `Repositories`, `Services`, `DTOs`.
-   **`SmartSpender.API` (Presentation Layer):** Exposes the application's functionality via a RESTful API. **Strictly for DB CRUD operations.**
    -   **Responsibilities:** Handling HTTP requests and calling DAL services.
    -   **Key Components:** `Controllers`.
-   **`SmartSpender.BE` (Background Service):** A background worker service for data processing.
    -   **Responsibilities:** Running background tasks, such as importing data from Excel files. Runs independently of the API.
    -   **Key Components:** `Services` with `IHostedService` implementations.

## Development Guidelines

### Adding a New API Endpoint

1.  **DAL:** Add or modify entities, DTOs, and services as needed.
2.  **API:** Add a new controller that injects and uses the corresponding service from the DAL.

### Modifying the Background Service

1.  **BE:** Modify the services in the `Services` directory in the `SmartSpender.BE` project.

### Database

The application uses a SQL Server database named `LLMFinance`. The connection string is hardcoded in `SmartSpender.DAL/Models/LlmfinanceContext.cs`. This should be moved to `appsettings.json` in the future. Use Entity Framework Core migrations for schema changes.
