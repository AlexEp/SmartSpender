# AGENTS.md

## Project Overview
- **SmartSpender**: Personal finance tracking application.
- **Stack**: .NET backend, Angular frontend, Avalonia desktop client.

## Project Structure
- **`SmartSpender.Core`**: Core logic (Entities, DTOs, Services, Interfaces).
- **`SmartSpender.DAL.BL`**: Data access business logic.
- **`SmartSpender.DAL.API`**: ASP.NET Core Web API.
- **`SmartSpender.DataCollector`**: .NET console app for background data processing. Located in `SmartSpender.BE/`.
- **`SmartSpender.UI`**: Avalonia desktop application.
- **`SmartSpender.Web`**: Angular SPA.
- **`SmartSpender.DAL.BL.Tests`**: Unit tests for the data access layer.

## Golden Rules
1.  **API Logic**: API controllers must be thin wrappers around `SmartSpender.DAL.BL` services. No business logic in controllers.
2.  **Branch Naming**: `{yymm}/feature/{kebab-case-description}` (e.g., `2408/feature/new-feature`).

## Setup & Execution

### Prerequisites
- .NET 8 SDK
- Node.js & npm
- SQL Server

### Database
- **Name**: `LLMFinance`
- **Connection String**: Hardcoded in `SmartSpender.Core/Models/LlmfinanceContext.cs`.
- **Schema**: Auto-generated on first run.

### How to Run
- **API**: `cd SmartSpender.DAL.API && dotnet run` (Port: 3010, Swagger: /swagger)
- **Web**: `cd SmartSpender.Web && npm install && npm start` (Port: 4200)
- **Desktop UI**: `cd SmartSpender.UI && dotnet run`
- **Data Collector**: `cd SmartSpender.BE && dotnet run`
- **Tests**: `cd SmartSpender.DAL.BL.Tests && dotnet test`

## Development Guidelines
- **New API Endpoint**:
  1.  Modify `SmartSpender.Core` (Entities/DTOs).
  2.  Modify `SmartSpender.DAL.BL` (Services).
  3.  Add new controller to `SmartSpender.DAL.API`.
