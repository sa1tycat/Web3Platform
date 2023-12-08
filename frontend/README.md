## Running the Badge Management App

To run the Badge Management App, navigate to the `badge-management-app` directory and execute `npm start`.

### First-time Setup

If it's your first time running the app, you may need to install dependencies using `npm install` (in case `npm start` fails).

### Troubleshooting Start Errors

Occasionally, `npm start` might fail due to issues with the installed modules. Follow these steps to resolve it:

1. Remove the `node_modules` directory:
    ```bash
    rm -rf node_modules
    ```

2. Clear the npm cache forcefully:
    ```bash
    npm cache clean --force
    ```

3. Reinstall dependencies:
    ```bash
    npm install
    ```

4. Start the app again:
    ```bash
    npm start
    ```

These steps should help resolve any issues related to corrupted modules or errors encountered during the startup of the app.
