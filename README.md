# SPRING 8 - Inprocode (React)
## Description

This project is a **business insight** tool designed from the perspective of a rotisserie. The application tracks daily revenue, provides interactive charts to visualize sales trends, and includes a competitor map for analyzing the local market. Additionally, it features a holiday calendar that highlights peak business days and offers full CRUD functionality for efficient data management.

<br>

## Application

- **Home page**: Carousel photos and information about the business.
<p align="center">
  <img src="https://github.com/user-attachments/assets/d07a7838-4bf2-4d59-a377-e1ca4ed67845" alt="Home Page" width="80%" />
</p>
<p align="center">
  <em>Here is a snippet of the Home page.</em>
</p>

- **Revenue Overview**:
<p align="center">
  <a href="https://youtu.be/-LcEd4paWwg">
    <img src="https://img.youtube.com/vi/-LcEd4paWwg/0.jpg" alt="Watch the video" />
  </a>
</p>
<p align="center">
  <em>Here is a video of the CRUD functionality on the Revenue Overview page.</em>
</p>

- **Revenue through graphics**: Two graphics connected to the data you include in the Revenue Overview. 
- **Calendar**: A calendar with a month view and an agenda of upcoming events.
- **Competitors**: A map and analysis of direct competitors.

<br>

## Technologies Used

### Backend:
- **Node.js**
- **Express**
- **MySQL**
- **Nodemon**
- **TypeScript** (TS)
- **Sequelize** (for database synchronization)

### Frontend:
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **React Context API**
- **Recharts** (for charts)

### Tools & APIs:
- **Vite** (for bundling and dev server)
- **Google Maps API** (for map integration)
- **Google APIs** (for various services with API keys)
- **Postman** (for testing API endpoints)

<br>

## Main Features

### Frontend (Client-side)
- [x] Responsive design
- [x] CRUD functionality for revenue management
- [x] Interactive charts to visualize trends
- [x] Competitor map analysis (view-only)
- [x] Calendar with CRUD functionality
- [x] Reusable components
- [x] URL parameters
- [x] Centralized and dynamic routing
- [x] Deployed with Vercel

### Backend (Server-side)
- [x] API for revenue data management
- [x] API for calendar events and holidays
- [x] API for competitor map data
- [x] Server-side logic with Node.js and Express
- [x] MySQL database for persistent storage
- [x] Sequelize ORM for database management
- [x] Integration with Google Maps API
- [x] Integration with external revenue and calendar APIs

### To-Do / Planned Features
- [ ] Modals in Calendar
- [ ] Add new competitors and filter in map
- [ ] Unit tests

<br>

## Installation

1. Clone the repository   
  
    ````bash
     git clone https://github.com/danilly7/inprocode-react.git
     cd inprocode-react
    ````

    <br>
2. Make sure you have Node.js installed

    Check if you have it installed on your machine (preferably version 16.x.x or higher): 
  
    ````bash
     node -v
    ````

    If needed, you can download it from [here](https://nodejs.org/en).
   
    <br>
3. Set up the backend

- Database Setup

  - Install and configure XAMPP:
 
    If needed, you can download it from [here](https://www.apachefriends.org/download.html).

    Once installed, launch the XAMPP Control Panel and start the Apache and MySQL services.
  
  - The backend expects a MySQL database named **revenue**.

    Make sure to create this database in your MySQL server before running the backend.
  
    You can create the database using phpMyAdmin or by running the following SQL query in your MySQL command line or client:

    ```` sql 
      CREATE DATABASE revenue;
    ````

- Server Setup 

  - Navigate to the backend directory:

    ````bash
       cd backend
    ````

  - Install the backend dependencies:
  
    ````bash
       npm install
    ````

  - Create the .env file:

    Copy the .env.example file and create a new .env file in the backend folder.

    For now, it only contains the port configuration. You can customize it if needed.

  - Run the backend server:

    Once the database is created and the .env file is configured, you can start the backend server and it will automatically sync with the revenue database.

    ````bash
       npm run dev
    ````
    
    <br>
4. Set up the frontend

- Navigate to the frontend directory:

    ````bash
       cd frontend
    ````
    
- Create the .env file and provide your API key:

  - Copy the .env.example file and create a new .env file in the frontend folder.
  - Go to [Google Maps](https://cloud.google.com/maps-platform) (or the service you are using) and generate your API key.
  - Replace `your-api-key-here` in the `.env` file with the key you obtained.  
    
- Install the frontend dependencies:
  
    ````bash
       npm install
    ````

- Run the frontend development server:

    ````bash
       npm run dev
    ````
    
    <br>
5. Access the project

   Once both the frontend and backend servers are running, open your browser and navigate to the URL provided by the frontend server. The URL will typically be something like:
   
    ````bash
       Local: http://localhost:5174/
    ````
    
    <br>
   Your project should now be live and connected to the backend and frontend!

    <br>
### Notes
- Ensure that the .env files for both the backend and frontend are correctly set up with the necessary environment variables (e.g., API keys, database credentials).
- The backend .env.example file currently only includes a port configuration (PORT=3000). You can customize it for additional settings.
- The frontend uses the Google API key, which must be included in the .env file of the frontend directory.

<br>

## Author

#### Danilly Condori Lerpido - [GitHub](https://github.com/danilly7)
