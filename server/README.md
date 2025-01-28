# Express TypeScript Backend

This is a backend project built with **Express** and **TypeScript**. It includes essential features such as **Role-Based Access Control (RBAC)**, **JWT authentication** (using access and refresh tokens), and **Swagger-UI** for API documentation.

## Features

- **TypeScript** for strong typing and cleaner code.
- **Role-Based Access Control (RBAC)** to manage permissions based on user roles.
- **JWT Authentication**:
  - Access tokens for short-term user authentication.
  - Refresh tokens for generating new access tokens securely.
- **Swagger-UI** for interactive API documentation.
- Modular and scalable project structure.
- Middleware for error handling and authentication.

---

## Project Structure

```
📁 root
├── 📁 app
│   ├── 📁 common
│   │   ├── 📁 dto
│   │   ├── 📁 helper
│   │   │   ├── config.helper.ts
│   │   │   ├── jwt.helper.ts
│   │   │   ├── response.helper.ts
│   ├── 📁 middleware
│   │   ├── catch-error.ts
│   │   ├── error-handler.ts
│   │   ├── role-auth.ts
│   ├── 📁 services
│   │   ├── database.ts
│   │   ├── email.ts
│   │   ├── passport.ts
│   ├── 📁 modules
│   │   ├── 📁 1st module
│   │   │   ├── module.dto.ts
│   │   │   ├── module.controller.ts
│   │   │   ├── module.route.ts
│   │   │   ├── module.schema.ts
│   │   │   ├── module.service.ts
│   │   │   ├── module.validation.ts
│   ├── routes.ts
├── 📁 swagger
│   ├── swagger.ts
│   ├── merge_swagger.json
│   ├── show_swagger.json
├── app.ts
├── index.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A supported database (e.g., MongoDB, PostgreSQL, MySQL)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Setup environment variables:**

   Create a `.env` file in the root directory and define the following variables:

   ```env
   PORT=3000
   NODE_ENV="local"
   FE_BASE_URL="frontend url"
   MONGODB_URI=<your-database-url>
   ACCESS_TOKEN=<your-access-token-secret>
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   ACCESS_TOKEN_EXPIRATION=1h
   REFRESH_TOKEN_EXPIRATION=7d
   MAIL_USER = "youremail@gmail.com"
   MAIL_PASS = "yourpassword"
   ```

4. **Start the application:**

   Local mode:

   ```bash
   npm run local
   ```

   Development mode:

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm run prod
   ```

---

## Scripts

- `npm run dev` - Start the development server with live reload.
- `npm run build` - Compile TypeScript into JavaScript.
- `npm run prod` - Run the compiled application.

---

## API Documentation

Interactive API documentation is available through **Swagger-UI**:

1. Start the server.
2. Visit `http://localhost:<PORT>/api/docs` in your browser.

### Swagger Setup

Swagger-UI is configured in the project to auto-generate documentation based on defined routes. To extend or modify the documentation, edit the Swagger configuration in `swagger/swagger.ts`.

---

## RBAC Configuration

Roles and permissions are managed using middleware. You can define roles (e.g., `admin`, `user`, `moderator`) and assign them to specific routes. Example:

```typescript
import { Router } from "express";
import { roleAuthMiddleware } from "./app/common/middleware/role-auth.middleware.ts";

const router = Router();

router.get("/admin", roleAuthMiddleware, (req, res) => {
  res.send("Welcome, Admin!");
});

export default router;
```

---

## JWT Authentication

1. **Access Tokens**: Short-lived tokens used for authentication.
2. **Refresh Tokens**: Long-lived tokens used to generate new access tokens without requiring user credentials.

Endpoints:

- **POST** `/api/login`: Authenticate a user and return an access token and refresh token.
- **POST** `/api/refresh`: Generate a new access token using a refresh token.
- **POST** `/api/logout`: Invalidate the refresh token.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch and create a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).
