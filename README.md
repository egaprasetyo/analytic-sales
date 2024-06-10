# Project Overview

An analytic sales dashboard application built with Vite, React, and TypeScript, using Chart.js for data visualization and Axios for API calls.

## Features

- Display a daily sales trend using line chart
- Display a sales comparison by product using bar chart
- Summary statistics such as total sales, total revenue, and the best selling product

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 21 or later)
- npm (version 10 or later)

### Installation

1 . Clone the repository:

```sh
git clone https://github.com/egaprasetyo/analytic-sales.git
```

2 . Navigate to the project directory:

```sh
cd analytic-sales
```

3 . Install dependencies:

```sh
npm install
```

### Running The Project

Start the development server

```sh
npm run dev
```

Open http://localhost:5173 with your browser to see the result.

## Running the JSON Server

The project uses json-server to mock the backend API. To start the JSON server with the db.json file, use the following command:

```sh
cd analytic-sales
cd data
json-server --watch db.json --port 8000
```

This will start a JSON server at http://localhost:8000. Ensure the JSON server is running when you start the development server to enable API calls.