This Telegram bot application sends job openings from diverse online platforms, starting with Upwork integration.
Receive real-time updates on job opportunities straight to your Telegram inbox.
Stay ahead in your job search effortlessly.
Simply subscribe to relevant categories and let the bot do the rest.
More platform integrations coming soon!

# Pre-installation Setup
1. Create a Telegram Bot via the Telegram app, following the instructions provided in the video link: https://youtu.be/aNmRNjME6mE. Obtain the token necessary for integration with the application. The obtained token should be placed in the .env file under the variable `TELEGRAM_BOT_API_TOKEN`.
2. Create a MongoDB cluster to serve as the database. In the .env file, assign the variables listed in .env.dist with your credentials.

# Installation
To install the application, follow these steps:
1. Clone the repository: ```git clone https://github.com/vagison/job-finder```
2. Navigate to the project directory: ```cd job-finder```
3. Install the dependencies: ```npm i```

Please note that the application has been tested on Node.js version 16, and it is recommended to use this version or above for optimal compatibility and performance.

# Running
To run the application, follow these steps:
1. To start the compiled application located in the 'dist' directory using Node you have to run the following commands:

    ```npm run build```
   
    ```npm start```
2. To initiate the application using the pm2 process manager, simply execute ```pm2 start pm2.json``` after building the application within the 'dist' directory.
3. Alternatively to run the application in development mode with nodemon you have to run the following command: ```npm run dev```
4. To clean the 'dist' directory, you can use the following command: ```npm run clean```

# Environment Configuration
Create a .env file in the root of the project and configure the environment variables listed in .env.dist

# Application structure description
The application code is located under the 'src' directory.

app.js is the entry point of the app. It initiates the DB and Telegram Bot connections and schedules the tasks:

The directory structure of the project is self explanatory. Here's a brief introduction to it:
* Configs: Contains all configurations required for DB and Telegram Bot connections.
* Constants: Holds some hardcoded values, including error messages.
* Models: Defines the schemas for defined entities.
* Providers: Includes the functionality to manipulate entities and data.
* Schedule: Contains functionality for scheduling and executing tasks using node-schedule and related modules.
* Services: Encompasses Telegram Bot service and various websites related logic responsible for specific business logic and functionalities.
* Shared: Includes logic that is shared among multiple services, entities or other conceptual components, promoting code reuse and maintainability within the project.
* Utils: Serves as a directory to store helper functions, validating schemas and error handling functionality as well as database initializing logic.

There are some files in the root directory apart from 'src' directory:
* .babelrc.json - used to run the app with nodemon in development mode and for building purposes.
* .env.dist - lists the environment variables required to run the application.
* .gitignore - used to exclude files from being pushed to the repository.
* package.json - includes a list of the packages and their versions used for this project.
* pm2.json - configures PM2, specifying settings for process management and deployment of the application.


# Usage
Once the Telegram Bot is created and the application is running, you can access it through the Telegram application.
Simply type /start in the chat with your Telegram Bot and you will receive further instructions on how to register queries, retrieve them or obtain jobs for saved queries.
After registering a query, you will receive job batches for each of them every 5 minutes.
You can also modify the code to adjust the frequency of CRON jobs as needed.
