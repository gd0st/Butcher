module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    execute(message, args) {
        if (!args.length) return message.channel.send('No command was specified for reload.');
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send(`${commandName} does not exist.`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command ${command.name} was reloaded!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while trying to reload ${commandName}.`);
        }
        

    }
}