# Portfolio Dashboard

## Overview

Portfolio Dashboard is a React-based application that allows users to manage and track their investment assets in a user-friendly and performant way. The app uses Redux for state management and leverages virtualization with `react-window` to efficiently render large portfolios (100+ assets) without compromising performance. Real-time data updates, responsive design, and an intuitive interface make it easy to monitor asset performance.

## Features

- **Portfolio Overview:**
  - Displays a comprehensive table of assets.
  - Shows details such as asset name, quantity, current price, total value, 24h change, and percentage of the portfolio.
  - Allows users to remove assets with a simple click.

- **Virtualized Asset List:**
  - Uses `react-window`’s `FixedSizeGrid` (or `List`) for efficient rendering.
  - Ensures smooth scrolling and performance even with large datasets.

- **Responsive Design:**
  - Utilizes modern CSS techniques (including `clamp()` for responsive typography) and SCSS modules for consistent styling across devices.
  - Implements fixed layout strategies for header and grid columns to maintain alignment.

- **Real-Time Updates:**
  - Integrates with external APIs to fetch up-to-date asset prices and performance metrics.
  - Dynamically displays percentage changes and price updates.

## Technologies Used

- **React:** For building the interactive user interface.
- **Redux:** For centralized and efficient state management.
- **react-window** For virtualizing large lists and grids.
- **SCSS Modules:** For scoped, modular, and responsive styling.
- **Axios:** For HTTP requests and fetching asset data.

## Project Structure
- src/pages: Contains pages.
- src/modules: Contains feature components such as Header, PortfolioList, FormAdd, and PriceUpdater.
- src/shared: Includes Redux slices (portfolio and form), helper functions, and shared constants.
- src/App.tsx: Main application component that integrates all pages.
- src/main.tsx: Application entry point.


## Installation

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. **Clone the repository:**
   git clone https://github.com/yourusername/portfolio-dashboard.git
   cd portfolio-dashboard

2. **Install dependencies:**
   npm install

3. **Run the application:**
   npm start
