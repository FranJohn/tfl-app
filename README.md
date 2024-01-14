# London Tube Status App

This is a simple React application that fetches and displays information about London Tube lines from the Transport for London (TFL) API.

## Overview

The application consists of a React front end that fetches Tube line information using the TFL API. It provides a user interface to view the status of different Tube lines and additional details for each line.

## Deployment
This application is tested and deployed using CICD pipelines. The appliction is hosted on github pages: https://franjohn.github.io/tfl-app/. 

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/london-tube-status-app.git
   ```
2. Install dependancies: 
    ```bash
    cd london-tube-status-app
    npm install
    ```
3. Run the applciation: 
    ```bash 
    npm run build
    npx serve@latest out
    ```

    This will start the development server, and you can view the app in your web browser at http://localhost:3000.

## Usage

The main page of the application displays the status of London Tube lines. Clicking on a Tube line provides additional details, including the status description and reason.
API Key

To fetch data from the TFL API, you need to provide an API key. Make sure to set the NEXT_PUBLIC_TFL_API_PRIMARY_KEY environment variable in your project or provide it during runtime. This is included as a secret during the example deployment. 

```bash

NEXT_PUBLIC_TFL_API_PRIMARY_KEY=your-api-key npm start

```
