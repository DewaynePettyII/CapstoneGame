# Capstone Game (Front End Developer 2)
## JSONSERVER
All JSONSERVER related codes and functions

***Contributers***

Dewayne Petty II

## Characters.json

This is one of the descritptions for the characters featured in the API.

These are the specific characteristics I chose to label for each character.
```
{
	"Mario_API": [
		{
		  "character": "Mario",
		  "image": "https://pngimg.com/uploads/mario/mario_PNG57.png",
		  "alignment": "Hero",
		  "background":"Depicted as a short, pudgy, Italian plumber who resides in the Mushroom
           	   Kingdom, his adventures generally center on rescuing Princess Peach from the Koopa 
                   villain Bowser. Mario has access to a variety of power-ups that give him 
                   different abilities."
		},
}
```
## Opening A Server

Open a new Terminal / Use GitHub

Create a package.json file
* npm init

Write description
* Hit enter until you are back at the main GitBash menu

Enter: npm install --save json-server

Start the server
* In the script, run "test" by typing in: "json-server --watch (name of your json file).json"

Run the server
* Enter : npm run json:server

## Package 

This is the json file used to help run the project onve the server is active.

This is a portion of it:
```
{
  "name": "capstonegame",
  "version": "1.0.0",
  "description": "Mock-Up REST API for Mario: Mini Rush",
  "main": "mariojs.js",
  "scripts": {
    "json:server": "json-server --watch characters.json"
  },
```
  ## Package-Lock

  The second portion of the Package.json file. Automatically generated once the package.json was made.

  This file keeps the dependant, package.json file, reprodicing the same results each time. It's  file is far more extensive. 
