# typescript-crud

A clean and scalable TypeScript-based CRUD project using Node.js, Express, MongoDB, and Webpack.

---

## Features

- TypeScript + Node.js + Express backend
- RESTful API with full CRUD functionality
- MongoDB with Mongoose ODM
- Webpack for frontend bundling (optional React support)
- Separated API and UI routers
- Clean object-oriented architecture: Controller → Service → Model
- Auth-ready structure for future expansion

---

## 🛠 Tech Stack

| Category       | Stack                             |
|----------------|------------------------------------|
| Language       | TypeScript                         |
| Runtime        | Node.js                            |
| Framework      | Express.js                         |
| Database       | MongoDB                            |
| ODM            | Mongoose                           |
| Frontend (opt) | React (optional)                   |
| Bundler        | Webpack                            |
| Transpiler     | ts-node / ts-node-dev              |
| Dev Tool       | concurrently                       |
| Env Manager    | dotenv                             |
| Build Tool     | nodemon, tsc                       |
| Lint/Format    | eslint, prettier (optional)        |
| Deployment     | Docker / Vercel / Railway (planned)|

---

## 📚 Key Libraries & Packages

### Backend

- express
- mongoose
- cors
- dotenv
- morgan
- cookie-parser
- express-session (optional)
- jsonwebtoken (for future JWT auth)
- bcryptjs (for password hashing)

### DevDependencies

- typescript
- ts-node
- ts-node-dev
- nodemon
- concurrently
- @types/express
- @types/node
- @types/mongoose
- @types/cookie-parser
- @types/jsonwebtoken
- @types/bcryptjs

### Frontend (Optional)

- react
- react-dom
- webpack
- webpack-cli
- ts-loader
- babel-loader (optional)
- @babel/preset-react
- html-webpack-plugin
- @types/react
- @types/react-dom

---