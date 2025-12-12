# Project Overview

This is a full-stack web application designed to help users track their expenses. The project consists of a .NET backend, an Angular frontend, and a React frontend. It also includes a background service for data processing and a desktop UI.

The application allows users to manage their expenses by organizing them into businesses and categories. It provides features for:
- Creating, reading, updating, and deleting businesses and categories.
- Assigning categories to businesses.
- Importing raw transaction data.
- Generating reports on spending, such as monthly summaries and pie charts.

## Project Structure

- **`SmartSpender.DAL.API`**: An ASP.NET Core Web API that exposes the application's functionality through a set of RESTful endpoints. (Located in root)
- **`Backend/SmartSpender.DAL.BL`**: A class library that contains the business logic of the application.
- **`Shared/SmartSpender.Core`**: A class library that contains the core entities, DTOs, and interfaces.
- **`Backend/SmartSpender.BE`**: A background worker service that performs data processing tasks.
- **`Desktop/SmartSpender.UI`**: An Avalonia desktop application.
- **`Frontend/AngularApp`** (formerly SmartSpender.WEB): An Angular single-page application that provides the user interface for the application.
- **`SmartSpender.WEB.React`**: A React single-page application. (Located in root)

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

This will start a local development server. You can view the application by navigating to `http://localhost:4200/` in your web browser.

## Frontend (React)

To run the frontend application, navigate to the `SmartSpender.WEB.React` directory and run the following commands:

**1. Install Dependencies:**

```bash
npm install
```

**2. Run the Development Server:**

```bash
npm start
```

This will start a local development server. You can view the application by navigating to `http://localhost:5173/` in your web browser.

### Key Features (UI/UX Upgrade)

- **Modern Design System**: A premium theme based on Material UI with a custom color palette (Indigo/Emerald) and improved typography (Inter/Poppins).
- **Responsive Layout**: A new modular layout with a dedicated Sidebar and Header for better navigation and context.
- **Enhanced Dashboard**: Visual-rich dashboard with card-based layouts, polished charts, and clear metrics.
- **Management Views**: Upgraded Business and Category pages with advanced tables, search, and action tooltips.
- **Comparison Tools**: A redesigned Transfer List component for easy cross-assignment of categories and businesses.


# API Endpoints

The backend API provides the following endpoints:

## BusinessCategories

- `GET /api/BusinessCategories`: Get all business-category relationships.
- `GET /api/BusinessCategories/{id}`: Get a specific business-category relationship by ID.
- `POST /api/BusinessCategories`: Create a new business-category relationship.
- `DELETE /api/BusinessCategories/{id}`: Delete a business-category relationship.
- `GET /api/BusinessCategories/compare/business/{businessId}`: Get a comparison of categories for a specific business.
- `GET /api/BusinessCategories/compare/category/{categoryId}`: Get a comparison of businesses for a specific category.
- `PUT /api/BusinessCategories/UpdateBusinessCategories`: Update the categories for a business.
- `PUT /api/BusinessCategories/UpdateCategoryBusinesses`: Update the businesses for a category.

## Businesses

- `GET /api/Businesses`: Get all businesses.
- `GET /api/Businesses/{id}`: Get a specific business by ID.
- `POST /api/Businesses`: Create a new business.
- `PUT /api/Businesses/{id}`: Update a business.
- `DELETE /api/Businesses/{id}`: Delete a business.

## Categories

- `GET /api/Categories`: Get all categories.
- `GET /api/Categories/{id}`: Get a specific category by ID.
- `POST /api/Categories`: Create a new category.
- `PUT /api/Categories/{id}`: Update a category.
- `DELETE /api/Categories/{id}`: Delete a category.
- `GET /api/Categories/{id}/monthly-summary`: Get a monthly summary for a category.

## RawData

- `GET /api/RawData`: Get all raw data.
- `GET /api/RawData/{id}`: Get specific raw data by ID.
- `POST /api/RawData`: Create new raw data.
- `PUT /api/RawData/{id}`: Update raw data.
- `DELETE /api/RawData/{id}`: Delete raw data.

## Reporting

- `GET /api/reporting/category-monthly-pie-chart`: Get data for a monthly pie chart of categories.
- `GET /api/reporting/transactions/{year}/{month}/{categoryName}`: Get transactions for a specific category in a given month and year.

# Data Models

The application uses the following main data models:

- **`BusinessDto`**: Represents a business with a `businessId` and `description`.
- **`CategoryDto`**: Represents a category with a `categoryId` and `categoryName`.
- **`TransactionDto`**: Represents a transaction with details like `issueDate`, `description`, and `price`.
- **`RawDataDto`**: Represents raw imported data.
- **`BusinessCategoryComparisonDto`**: Used for comparing categories for a business, containing the business and lists of included and not included categories.
- **`CategoryBusinessComparisonDto`**: Used for comparing businesses for a category, containing the category and lists of included and not included businesses.
- **`CategoryMonthlyPieChartDto`**: Contains data for the monthly pie chart, including `categoryId`, `categoryName`, `totalPrice`, and `totalEntries`.
- **`CategoryMonthlySummaryDto`**: Contains a monthly summary for a category, including `year`, `month`, `totalEntries`, and `totalPrice`.

# Development Conventions

## Branching Strategy

Feature branches should be named using the following pattern:

`{YYMM}/feature/{description}`

- `{YYMM}`: The year and month in `YYMM` format (e.g., `2408` for August 2024).
- `{description}`: A short, descriptive name of the feature in kebab-case.
