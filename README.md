# Neurologue
**The Game That Plays You.**

A psychological horror choose-your own-adventure game that follows the player's meeting with a slightly philosophical psychiatrist. Unlike traditional video games, the characters in Neurologue can sense exactly how the player is feeling in real-time. Using an electroencephalographic brain-computer interface, the game reads 7 major physiological metrics that determine the way that characters interact with you, the effect of your choices, and who you are as a player. Whether you are excited, focused, or relaxed, Neurologue makes the story as real as it gets.

## Technologies used
* Emotiv INSIGHT 5 Channel EEG
* Emotiv Cortex API
* Phaser.js
* Node.js
* NPM
* MS Paint
* GameMaker Sprite Editor

## Try it yourself!
In the project directory, install npm dependencies:

    npm install
Connect your Emotiv device and run Cortex (if no EEG device available, skip this- game will use default values for EEG metrics):

    node cortex.js
Run the app

    node server.js

Open [http://localhost:9000](http://localhost:9000) to view it in your browser, and make sure your sound is on!
