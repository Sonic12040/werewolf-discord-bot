// import the discord.js package so we can use its constructor
const Discord = require('discord.js');
// Generate a new client constructor
const client = new Discord.Client();
// Quick check to see if a game of werewolf is initiated
let gameIsInitiated = false;

// Events that need to fire on load of the client
client.once('ready', () => {
  console.log('The client is now ready.');
});

// This is the bot's login to the Discord server
client.login('token here');

// This fires any time a message is sent in a channel the bot has access to
client.on('message', (message) => {
  // Parsing the initial command for determining what to fire
  const command = parseCommand(message.content);
  // Parsing options for the werewolf game so they can be easily accessed
  const options = parseOptions(message.content);
  // Aliasing the reply API so if it changes, we only have to change it once
  const sendReply = (reply) => message.channel.send(reply);

  switch (command) {
    case '!werewolf start':
      if (gameIsInitiated === false) {
        gameIsInitiated = true;
        initiateGame(options);
      } else {
        sendReply(
          'A game of Werewolf has already been started. Please wait for this game to complete before beginning a new one.'
        );
      }
      break;

    case '!werewolf help':
      runHelp();
      break;

    case '!werewolf advance':
      if (gameIsInitiated) {
        // We deliberately do not refer to this as night, in case players want a game setting that involves daytime
        advanceGame();
      } else {
        sendReply(
          "A game of Werewolf has not yet been started. Please run '!werewolf start' to start a game, or '!werewolf help' to learn more!"
        );
      }
      break;

    default:
      break;
  }
});
