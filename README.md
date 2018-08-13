# Kyiv: places to visit

## Overview
The application shows user examples of interesting places in Kyiv.     
User is able to filter the places with the input field.     
The places are shown on the map with markers.    
Clicking on the marker or on the location from the list will open the info window with short information about the selected place.

## How to run
* Please, download zip with all files to your computer;
* You need the nmp on your computer;
* Go to your terminal, change the folder to the project main folder with 'cd' command;
* Install the components with 'npm install' command;
* Launch application by typing the 'npm start' command to the terminal, the application will be opened in your browser.

## Additionally you will need to install:
* Fetch JSONP library with command 'npm install fetch-jsonp'
* Escape RegExp library with command 'npm install --save escape-string-regexp'

## Notes
* The project was created with 'create-react-app'
* The service worker is enabled in the production environment.        
To test the servise worker you need to build the application (using 'npm run build' command) and run a simple http server from your
build directory.

## API used in project
* Google Map API
* MediaWikiAPI
