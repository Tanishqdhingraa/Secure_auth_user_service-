🔐 Secure Auth Service

A production-ready authentication microservice built with **Node.js + Express** featuring:

- JWT Authentication
- Refresh Token Mechanism
- Role-Based Authorization
- Zod Validation
- Winston Logging
- Docker Support

---

 🚀 Tech Stack

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- Winston
- Docker

---
 📁 Project Structure

secure-auth-service/
│
├── src/
│ ├── config/
│ │ └── logger.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── role.middleware.js
│ │ └── validate.middleware.js
│ ├── routes/
│ │ └── auth.routes.js
│ ├── schemas/
│ │ └── auth.schema.js
│ ├── utils/
│ │ └── token.js
│ ├── app.js
│ └── server.js
│
├── Dockerfile
├── .dockerignore
├── package.json
└── .env
