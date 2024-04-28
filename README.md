# React Front-end 

This repository contains the code for setting up a front-end 

## Set up React Front-end

### Prerequisites
- Node.js installed on your machine.

### Steps
1. Clone this repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

   This will run the React app in development mode. You can view it in your browser at `http://localhost:3000`.

# Set up Backend service api

### Prerequisites
- Node.js installed on your machine.
- MySQL database set up and running.

### Steps
1. Clone this repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the `server` directory:

    ```bash
    cd services
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure the MySQL connection in the `server.js` file:

    ```javascript
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database'
    });
    ```

   Replace `'your_username'`, `'your_password'`, and `'your_database'` with your actual MySQL credentials and database name respectively.

5. Start the server:

    ```bash
    node server.js
    ```

   The server will start running on port `5000` by default.

