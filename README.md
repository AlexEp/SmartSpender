# SmartSpender

SmartSpender is a .NET application designed to help users track their expenses. It provides a RESTful API for managing financial data, including businesses, categories, and raw transaction data.

## Project Structure

The project is composed of three main projects:

-   `SmartSpender.DAL` (Data Access Layer): This project is responsible for all database interactions. It uses Entity Framework Core to map C# entities to database tables. It also contains repositories and services for accessing and manipulating data.
-   `SmartSpender.API`: This is an ASP.NET Core Web API project that exposes the application's functionality through a set of RESTful endpoints. It handles HTTP requests and responses, and uses the services from the `SmartSpender.DAL` project to perform CRUD operations.
-   `SmartSpender.BE` (Background Service): This project is a background worker service that performs data processing tasks, such as importing data from Excel files. It runs independently of the API.

## Getting Started

To get the application up and running, you'll need to have the following installed:

-   .NET 8 SDK
-   SQL Server Express

### Database Setup

The application uses a SQL Server database named `LLMFinance`. The connection string is currently hardcoded in the `SmartSpender.DAL/Models/LlmfinanceContext.cs` file. Before running the application, you'll need to create a database with this name in your SQL Server Express instance.

The application will create the database schema automatically if it doesn't exist.

### Running the Application

1.  Clone the repository.
2.  Open the `SmartSpender.sln` file in Visual Studio or your preferred IDE.
3.  Set the `SmartSpender.API` project as the startup project.
4.  Run the application. The API will be available at the URL specified in the `launchSettings.json` file.

You can then use a tool like Swagger (available at `/swagger` in your browser) or Postman to interact with the API.
