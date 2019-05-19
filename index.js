const tmi = require('tmi.js')

const { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME } = process.env

//define config opts

const opts = {
    identity: {
        username: 'missilesquidTestBot',
        password: 'pyk0dnt3um1wacqfwqba614zyo5vfh'
    },
    channels: [
        'nevrbot'
    ]
}

//create a client

const client = new tmi.client(opts)

//register our event handlers we define below


//event handler here
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

//connect to twitch

client.connect()

//called every time a message comes in

function onMessageHandler (target, context, msg, self) {
    if (self) {return}
    const commandName = msg.trim().toLowerCase()

    console.log(msg)

    if (context.badges) {
        if (context.badges.broadcaster) {
            client.say(target, 'Watch out! Soon to be #1 Wizard101 streamer coming through! PogChamp')
        }
    }

    if (commandName === '!clear') {
        if (context.badges.moderator || context.badges.broadcaster) {
            client.say(target, '/clear')
        } 
    }

    if (commandName === '!slowmode on') {
        if (context.badges && context.badges.moderator) {
            client.say(target, '/slow')
        } 
    }

    if (commandName === '!slowmode off') {
        if (context.badges && context.badges.moderator) {
            client.say(target, '/slowoff')
        }
    }

    if (commandName === '!hello') {
        client.say(target, `Hello there (Nev told me not to put uwus in sorry)`)
    }
}





function onConnectedHandler (addr, port) {
    console.log(`connected on to ${addr}:${port}`)
    client.say('nevrbot', 'You did it! PogChamp')
}

