# Newtonian Chickens - Theoretical Poultry Science Platform

Welcome to Newtonian Chickens, a full-stack web application for the modern theoretical poultry scientist. This platform allows you to propose, test, and observe theories inspired by the great minds of classical mechanics, but applied to chickens.

This application is built using a Manifest-only backend and a React frontend, demonstrating a powerful, modern development stack.

## Features

- **User Authentication**: Secure signup and login for all scientists.
- **Theory Management**: Propose new theories, describe them in detail, and track their validation status.
- **Experiment Logging**: Document your experiments, methodologies, and results for each theory.
- **Observation Records**: Add detailed notes and images for each experiment.
- **Admin Panel**: A complete, auto-generated admin interface to manage all data, users, and files.

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd newtonian-chickens
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    The React application will start, typically on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## Using the Application

- **Sign Up**: Create a new 'scientist' account from the landing page.
- **Propose a Theory**: Once logged in, use the form on the dashboard to create a new theory.
- **Admin Access**: To manage all data, visit the admin panel. The link is available on the dashboard. Use the default credentials:
    - **Email**: `admin@manifest.build`
    - **Password**: `admin`

## Technology Stack

- **Backend**: [Manifest](https://www.mnf.st/) (Handles database, API, authentication, file storage, and admin panel).
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Backend Communication**: Manifest SDK (`@mnfst/sdk`)
