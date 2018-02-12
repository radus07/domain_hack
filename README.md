# domain_hack

A web application which depending on the inserted text, suggests the domain names. For example, if you input the text "birds" or "example", using the fictitious country-code domains ".ds" and ".le", suggests the domain names "bir.ds" or "examp.le" respectively. 

## Build Setup

### 1. Install NodeJS and NPM
 - Download from - https://nodejs.org/en/

### 2. Download and install MongoDB
 - Download from - https://www.mongodb.com/download-center
 - After installation, open the Command Prompt on disk C and run the following commands:
 ```
    > md \data\db
    > "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "path-to-your \data\db folder"
 ```
 - Connect to MongoDB, open another Command Prompt:
 ```
    > "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
 ```
### 3. Download the project
 - Download manually from - https://github.com/radus07/domain_hack.git
 - Or, using git, from the Command Prompt:
 ```
    > git clone https://github.com/radus07/domain_hack.git
 ```
### 4. Run the project
 - Open the root folder
 - Install the dependencies:
 ```
    > npm install
 ```
 - Init the project:
 ```
    > npm run "init"
 ```
 - Start the backend server, use another Command Prompt:
 ```
    > npm run "start backend"
 ```
 - Start the application on http server, use another Command Prompt:
 ```
    > npm run "start frontend"
 ```
 - Open your browser on - [http://localhost:8081/](http://localhost:8081)
 - Or run in `dev` mode
 ```
    > npm run "dev"
 ```
 - Open your browser on - [http://localhost:8080/](http://localhost:8080)
 - ENJOY THE APP!

### 5. NOTE!
For sign in use: username = password = "admin".
