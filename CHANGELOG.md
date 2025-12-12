# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Changed
- Complete UI/UX overhaul of the React application (`SmartSpender.WEB.React`) to a modern Material Design aesthetic.
- Refactored global layout into dedicated `MainLayout`, `Header`, and `Sidebar` components.
- Upgraded `Dashboard` with improved charts, card-based `MonthlyReport` and `CategoryMonthReport`.
- Enhanced `Business` and `Category` management pages with premium tables and action headers.
- Redesigned `BusinessCategoryComparison` and `TransferList` for better usability and visual appeal.
- Updated `theme.ts` with a new color palette (Indigo/Slate) and extensive component overrides.

### Fixed
- Fixed `run-react-app.bat` to use `npm run dev` instead of `npm start` as `start` script was missing in `package.json`.
- Corrected manual run instructions for React app in `AGENTS.md`.

### Added
- Added `run-react-app.bat` to easily run the React frontend.
- Added `run-backend.bat` to easily run the Backend API.
- Updated `AGENTS.md` with instructions for running the apps.
