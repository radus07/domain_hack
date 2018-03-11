# domain_hack

A web application which depending on the inserted text, suggests the domain names. For example, if you input the text "birds" or "example", using the fictitious country-code domains ".ds" and ".le", suggests the domain names "bir.ds" or "examp.le" respectively. 

## Build Setup

### 1. Install NodeJS and NPM
 - Download from - https://nodejs.org/en/

### 2. Download and install MongoDB
 - Download from - https://www.mongodb.com/download-center
 - After installation, open the Command Prompt and run the following commands:
 ```
    > md \data\db
    > "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "path-to-your \data\db folder"
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
    > npm run init
 ```
 - Start the backend server:
 ```
    > npm run start:b
 ```
 - Start the application:
    * _The compiled version:_
     ```
        > npm run start:f
     ```
     Open [http://localhost:8081/](http://localhost:8081)
     * _In `development` mode:_
     ```
        > npm run dev
     ```
 - ENJOY THE APP!

### 5. NOTE!
For sign in use: username = password = "admin".
