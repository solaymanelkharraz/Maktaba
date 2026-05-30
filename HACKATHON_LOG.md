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