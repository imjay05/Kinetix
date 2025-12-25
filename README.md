# Kinetix

A **self-hosted local file management system** built with **Spring Boot**, **MySQL**, and a modern web interface using **HTML, CSS, and JavaScript**.  
Kinetix allows users to upload, view, download, and organize files on a **locally hosted server**, acting like a personal cloud **without using third-party storage providers**.

---

## 🚀 Features

- 🔐 User-friendly interface for file uploads and browsing  
- 📂 Local file storage (no cloud dependencies)  
- 📄 File listing with metadata (name, size, type, etc.)  
- 🗑️ Delete and manage stored files  
- 📊 Backend powered by Spring Boot and MySQL  
- 🎨 Responsive front-end using HTML, CSS, and JavaScript  

---

## 🛠️ Tech Stack

| Layer      | Technology                  |
|------------|------------------------------|
| Backend    | Java 21, Spring Boot v3.4.8  |
| Frontend   | HTML, CSS, JavaScript        |
| Database   | MySQL                        |
| Storage    | Local file system            |
| Build Tool | Maven                        |

---

## ⚙️ Setup & Run Locally

### 🔧 Prerequisites

- Java 21+
- Maven
- MySQL (running locally)

### 📥 Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/imjay05/Kinetix.git
   cd Kinetix/MKinetix
Configure the Database

Create a MySQL database (e.g., Kinetix_db)

Update application.properties with your DB credentials:

spring.datasource.url=your_url
spring.datasource.username=your_username
spring.datasource.password=your_password
Build and Run the Application

mvn clean install
mvn spring-boot:run
Access the App

Open your browser and visit:
http://localhost:8080

📷 UI Preview
![Uploading Screenshot (19).png…]()


🤝 Contributing

Contributions are welcome!
Follow these steps to contribute:

Fork the project
Create a new branch
git checkout -b feature/feature-name
Commit your changes
git commit -m 'Add feature'
Push to the branch
git push origin feature/feature-name
Create a Pull Request

🙋‍♂️ Author

Jay Shlke
📫 github.com/imjay05
