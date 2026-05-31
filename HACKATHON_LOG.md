# Maktaba - Hackathon Action Log

## Day 1: Project Initialization
* **Action:** Created the monorepo folder `Maktaba`.
* **Action:** Decided on the project name "Maktaba" to give the BiblioTech Cloud application a modern, localized identity.
* **Command:** `git init` to start version control.
* **Reasoning:** Centralizing the Laravel API and React Frontend into a single monorepo for faster development and easier synchronization during the 15-day timeline.git add HACKATHON_LOG.md


## Day 1: Scaffolding the Workspaces
* **Action:** Created the Laravel application inside the `backend` directory.
* **Action:** Created the React application inside the `frontend` directory using Vite.
* **Reasoning:** Separating the concerns into `backend` and `frontend` folders allows for independent configuration and satisfies the requirement to deploy them separately to Vercel/Render, while keeping the source code centralized in the Maktaba monorepo.

## Day 1: Database Architecture & Local Environment
* **Action:** Booted up local WAMP server for initial database development.
* **Reasoning:** Developing locally eliminates network latency. The `.env` will point to `127.0.0.1` during the build phase and will be swapped to the AlwaysData credentials prior to final deployment.
* **Action:** Designed the logical schema (tables and relationships) for `livres`, `membres`, and `emprunts` directly into Laravel migrations, bypassing a formal MCD as it is not a requested deliverable.

## Day 1: Generating the Data Architecture
* **Action:** Used Artisan commands to generate Models and Migrations for `Livre`, `Membre`, and `Emprunt`.
* **Action:** Defined table schemas, including unique constraints for ISBN/Email and cascading foreign keys for the `emprunts` relationship table.
* **Action:** Successfully ran `php artisan migrate` against the local WAMP database.
* **Reasoning:** Establishing the exact schema requested in Dossier 1 ensures the data foundation is solid before building the API or Web interfaces.

## Day 1: Eloquent Models & Relationships
* **Action:** Configured `$fillable` arrays in `Livre`, `Membre`, and `Emprunt` models to allow mass assignment.
* **Action:** Defined Eloquent relationships (One-to-Many for `livres` and `membres` to `emprunts`, and Inverse One-to-Many for `emprunts` to its parent entities).
* **Reasoning:** Establishing these relationships in the ORM is required to satisfy Dossier 2 specifications and will make querying the database for the API and Blade views highly efficient.

## Day 1: Backend Logic & UI Architecture
* **Action:** Generated `EmpruntWebController` to handle the server-side logic for the traditional web interface.
* **Action:** Created `LibraryApiController` to serve clean JSON endpoints (`/api/livres`, `/api/emprunts`) for the upcoming React frontend.
* **Action:** Built Blade views (`app.blade.php`, `listeEmprunts.blade.php`, `ajouterEmprunt.blade.php`) utilizing **Tailwind CSS v4** for a premium, responsive UI.
* **Action:** Configured application routing by mapping web routes in `web.php`, defining API routes in `api.php`, and explicitly enabling API routing in Laravel 11's `bootstrap/app.php`.
* **Reasoning:** Separating the Web and API controllers cleanly satisfies the dual-nature requirement of the hackathon (Dossier 2 and 4). Utilizing Tailwind v4 for the Blade views immediately elevates the user experience, securing points for 'Qualité projet'.

## Day 2: Frontend Architecture & UI Strategy
* **Action:** Installed `react-router-dom`, `@reduxjs/toolkit`, `axios`, and `framer-motion` in the React frontend.
* **Action:** Designed a split-routing architecture. The application opens to a central Landing Page (`/`) that forces the user to choose between the `Local Redux` environment and the `Live API` environment.
* **Reasoning:** This split design explicitly isolates Dossier 3 (Redux Local) from Dossier 4 (React + API), proving to the judges that the application manages decoupled states perfectly. Using Framer Motion for the landing page transitions secures high marks for 'Qualité projet'.

## Day 2: React Component Generation & State Implementation
* **Action:** Implemented the Redux Toolkit store (`librarySlice.js`) populated with the exact required initial state.
* **Action:** Built out the strict local-only components (`ListeLivres`, `ListeEmprunts`, `AjouterEmpruntLocal`) to satisfy Dossier 3 requirements without API interference.
* **Action:** Built out the API-connected components (`ListeLivresApi`, `ListeEmpruntsApi`, `AjouterEmpruntApi`) utilizing Axios and Tailwind loading skeletons.
* **Action:** Created a Framer Motion-powered landing page (`App.jsx`) to handle the top-level routing between the Local and API environments.
* **Reasoning:** Implementing the exact initial Redux state explicitly outlined in the project brief guarantees maximum points for Dossier 3. The use of Tailwind Skeletons in the API components prevents layout shift, directly boosting the 'Qualité projet' score.

## Day 3: Architecture Documentation & Production Deployment
* **Action:** Compiled the comprehensive technical `system_report.md` detailing the hybrid administration architecture, including the React UI Engine's dual execution modes (Redux Sandbox vs. Axios REST client) and the Laravel 11 backend[cite: 1].
* **Action:** Documented the session-based i18n locale switching implementation and the UI/UX components (Tailwind CSS v4, Framer Motion)[cite: 1].
* **Action:** Engineered a production-ready `Dockerfile` using `php:8.3-apache` to containerize the Laravel API for Render deployment. 
* **Action:** Configured the Apache server inside the Docker container to dynamically bind to Render's injected `$PORT` environment variable to ensure seamless traffic routing.
* **Action:** Prepared the remote AlwaysData MySQL database credentials to be injected into the production environment via Render's environment variable dashboard.
* **Reasoning:** Providing a clear architectural map in the technical report demonstrates professional-grade project management. Containerizing the backend with Docker ensures exact environment consistency between local development and production, directly securing the 10 points allocated for "Déploiement en ligne".

## Day 3: Bug Fix - Database Migration Order
* **Error:** `SQLSTATE[HY000]: General error: 1005 (errno: 150 "Foreign key constraint is incorrectly formed")` during deployment to AlwaysData.
* **Root Cause:** The `emprunts` migration was executing before the `membres` migration due to the file timestamp generation order, causing the foreign key constraint to fail.
* **Resolution:** Renamed the `create_emprunts_table` migration file to a later timestamp to ensure parent tables (`livres` and `membres`) are strictly created before the associative table (`emprunts`).