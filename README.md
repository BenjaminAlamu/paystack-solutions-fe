
# Frontend Test – Vue 3 + Vite + Tailwind CSS

This project is a frontend test application built with **Vue 3**, **Vite**, and **Tailwind CSS**.  
It demonstrates component-based UI development, responsive design, and modern frontend best practices.

---

## 🚀 Tech Stack

- **Vue 3** – Progressive JavaScript framework  
- **Vite** – Fast and modern build tool  
- **Tailwind CSS** – Utility-first CSS framework  
- **TypeScript** – Type-safe development  

---

## Project Setup

To set up the project, clone the repository and install the dependencies:
```bash
git clone https://github.com/BenjaminAlamu/paystack-solutions-fe.git
cd paystack-solutions-fe
npm  install
```
## Environment Variables
This project uses environment variables to configure the database, application, and Redis settings and other configurations. Create a `.env` file in the root directory and add the variables in the `.env.sample`:

## Scripts

The project includes a variety of npm scripts to help with development, testing, and deployment:

-  **Development:**

-  `npm run dev`: Starts the development server.

-  **Production:**

-  `npm run build`: Creates a production build.

-  `npm run preview`: Creates a production build preview.


###  🧩 Folder Structure
```bash
src/
 ├─ assets/        # Static assets (images, icons, etc.)
 ├─ components/    # Reusable Vue components
 ├─ views/         # Page-level components
 ├─ hooks/         # Custom composables and data fetching logic
 ├─ services/      # API Calls are made here
 ├─ store/         # State management (Pinia)
 ├─ router/        # Vue Router configuration
 ├─ App.vue        # Root component
 └─ main.ts        # Application entry point

```