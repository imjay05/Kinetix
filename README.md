# Kinetix 
Kinetix is a full-stack file management system built to demonstrate CRUD (Create, Read, Update, Delete) operations. The project allows users to upload files, view their stored data, update metadata, and remove files from the system using a Spring Boot backend and a dynamic frontend.

## 📺 Project Demo
Watch the project in action here: https://github.com/imjay05/Kinetix/blob/main/Kinetix/Project_Demo/Kinetix.mp4 


## 🛠️ Tech Stack

| Layer      | Technology                  |
|------------|------------------------------|
| Backend    | Java 21, Spring Boot v3.4.8  |
| Frontend   | HTML, CSS, JavaScript        |
| Database   | MySQL                        |
| Storage    | Local file system            |
| Build Tool | Maven                        |

---

## 🏗️ Project Structure
The project follows a standard MVC (Model-View-Controller) architecture for the backend and a decoupled frontend.

```text
Kinetix/
├── Backend/Kintix/
│   ├── src/main/
│   │   ├── java/com/project/Kinetix/
│   │   │   ├── controller/
│   │   │   │   └── FileController.java        <-- Handles API Requests
│   │   │   ├── model/
│   │   │   │   └── FileEntity.java            <-- Data Structure (CRUD)
│   │   │   ├── repository/
│   │   │   │   └── FileRepository.java        <-- Database Interaction
│   │   │   ├── services/
│   │   │   │   └── FileStorageService.java    <-- Business Logic
│   │   │   └── KinetixApplication.java        <-- Entry Point
│   │   └── resources/
│   │       └── application.properties         <-- Config (DB, Port)
│   ├── pom.xml
│   ├── .gitignore
│   └── .gitattributes
├── Frontend/
│   ├── index.html                             <-- UI Structure
│   ├── style.css                              <-- UI Styling
│   ├── script.js                              <-- CRUD logic (Fetch API)
│   └── Kinetix_Logo.png
├── Project_Demo/
│   ├── Kinetix.mp4
│   └── kinetix_ui.png
└── README.md

```

## 🛠️ Features & CRUD Functionality

This project implements core persistent storage functions:

Create (Upload): Seamlessly upload files from the browser to the backend storage.

Read (List & View): Retrieve and display a dynamic list of all uploaded files with their specific details.

Download: Securely retrieve files from the server back to your local machine.

Delete: Remove file records from the MySQL database and the physical storage simultaneously.



## 🏁 Getting Started
Clone the repository:


git clone https://github.com/imjay05/Kinetix.git
Database Configuration:

Open Backend/Kintix/src/main/resources/application.properties.

Update the spring.datasource.username and password to match your local MySQL setup.

Run the Backend:

Navigate to the Backend folder and run the application via your IDE or using mvn spring-boot:run.

Launch the Frontend:

Simply open Frontend/index.html in any modern web browser.

## Developed by Jay Shelke

🙋‍♂️ Author
Jay Shelke
📫 github.com/imjay05
