# Hebrew Discord Bot

HebrewBot is a Node.js Discord bot built with discord.js that provides Hebrew welcome messages, guild-specific slash commands, and channel-restricted command handling. It welcomes new members in a configured Discord channel, responds to the `/shalom` and `/ping` slash commands, and limits command use to configured text-channel IDs.

## Install

1. Install Node.js 18.17.0 or newer.
2. Clone or download the project.
3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Set the following values in `.env`:

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_client_id_here
DISCORD_GUILD_ID=your_server_id_here
WELCOME_CHANNEL_ID=your_welcome_channel_id_here
COMMAND_CHANNEL_IDS=your_command_channel_id_here
```

6. Replace the placeholder values with the bot token, application ID, server ID, welcome-channel ID, and one or more command-channel IDs. Separate multiple command-channel IDs with commas.
7. Invite the bot to the server with permission to view channels, send messages, use slash commands, and access member events.

## Use

1. Start the bot:

```bash
npm start
```

2. When a member joins the configured server, the bot sends a Hebrew welcome message that mentions the member in the configured welcome channel.
3. Use `/shalom` in one of the configured command channels to receive a Hebrew greeting.
4. Use `/ping` in one of the configured command channels to receive a Hebrew availability response.
5. If a slash command is used outside the configured command channels, the bot replies privately in Hebrew that commands are only available in the designated channels.
6. Guild slash commands are registered automatically when the bot starts.

---

More Discord bot projects by EnderDevelopment: https://github.com/EnderDevelopment

Project page: https://dash.enderdevelopment.com/community/eca7cd22-4f08-479e-a2e1-2706504958a7?utm_source=github&utm_medium=readme&utm_campaign=auto_publish&utm_content=eca7cd22-4f08-479e-a2e1-2706504958a7
