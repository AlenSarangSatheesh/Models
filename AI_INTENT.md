# AI Intent & Project Guidelines

## Overall Goal
This workspace is used to develop and store various website templates, projects, and "Models". 

## Deployment Strategy
1. All sub-projects or "Models" should eventually be hosted on GitHub Pages.
2. The primary domain is `https://alensarangsatheesh.github.io`.
3. Any new project created inside the `Models` folder MUST be accessible via `https://alensarangsatheesh.github.io/Models/{folder_name}`.

## Instructions for AI Agents
When generating, modifying, or building a new project in this environment (especially Vite/React or similar frameworks), you MUST:
1. Ensure the deployment base path is configured correctly. For example, if building a Vite project intended for the `Models/MyNewApp` directory, the `vite.config.js` MUST contain `base: '/Models/MyNewApp/'`.
2. Configure any routers (like React Router) to use `basename="/Models/MyNewApp"`.
3. Use relative paths or the configured base path for all assets (images, fonts, etc.) so they don't break when deployed to a subdirectory on GitHub Pages.
4. When deploying, build the project and move the output (e.g., the `dist` folder) into the `Models/{folder_name}` directory within the `AlenSarangSatheesh.github.io` repository, then commit and push to the `main` branch.
