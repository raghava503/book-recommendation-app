\# 📚 Book Recommendation App



A full-stack book recommendation application built with React and ASP.NET Core.



\## 📁 Project Structure





book-recommendation-app/

├── BookRecommedationApi/ # ASP.NET Core 8.0 API

│ ├── Controllers/ # API endpoints

│ ├── Models/ # Data models

│ ├── Data/ # Database context

│ ├── Services/ # Business logic

│ └── Program.cs

├── book-app/ # React Frontend

│ ├── src/ # React source code

│ │ ├── components/ # React components

│ │ ├── services/ # API services

│ │ └── App.js

│ └── package.json

├── docker-compose.yml # Multi-container setup

└── README.md

\## 🚀 Quick Start



\### Prerequisites

\- Node.js (v18+)

\- .NET 8.0 SDK

\- Docker Desktop



\### Start with Docker (Recommended)



```bash

\# Build and run both services

docker-compose up -d



\# View logs

docker-compose logs -f

