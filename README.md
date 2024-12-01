# Blog Management Application

## Description
It is a small application to add, update ,delete blog for users.



## Technologies Used
- .NET Core 8.0
- Angular cli 17.1.0
- Node js 20.18.0
- Bootstrap 5.3.3



## Prerequisites
- .NET SDK version 8.0 or higher
- Node.js 20 or higher
- Angular CLI 17.1.0
- Database system (local json file BlogData.json) It is kept in project folder itself

## Installation
npm install -g @angular/cli@17.1.0
install node js 20.18.0 from official site https://nodejs.org/en/download/prebuilt-installer

## Run the Applicatiom
Backend (AP)
http://localhost:5036/swagger/index.html

Frontend (Angular)
The frontend will be available at http://localhost:4200.
ng serve

## Design Decisions and Application Structure
Design Decisions
# Separation of Concerns:
The application follows a client-server architecture. The backend provides RESTful APIs built with .NET Core, while the frontend is a standalone Angular application.
# Scalability: 
Modular design in both frontend (feature modules) and backend (controller-based routes) ensures that the application can scale with additional features.
# Bootstrap Integration: 
Bootstrap 5.3.3 is used for consistent styling and responsive design across devices.
# Local JSON File for Data Storage: 
A BlogData.json file is used to simulate a database for simplicity in a development environment. This can be replaced with a real database (e.g., SQL Server) in production.

## Application Stucture
# Backend(ASP.NET Core)
N-Layered Architecture.Created separate layer for service layer , data layer and controllers.
# Frontend (Angular)
Modules:
AppModule is the root module. Additional modules like BlogModule handle specific features.
Components:
AppComponent: The root component.
DisplayBlogsComponent: Displays the list of blogs and handles user actions like edit and delete.
EditBlogComponent: A modal or page to handle blog editing.
Services:
BlogService: Handles HTTP communication with the backend for CRUD operations.
Routing:
Configured in AppRoutingModule for navigation between different pages or features.
