require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");

const requiredVariables = [
  "DISCORD_TOKEN",
  "DISCORD_CLIENT_ID",
  "DISCORD_GUILD_ID",
  "WELCOME_CHANNEL_ID",
  "COMMAND_CHANNEL_IDS",
];

const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim());
if (missingVariables.length > 0) {
  console.error(`Missing required environment variables: ${missingVariables.join(", ")}`);
  process.exit(1);
}

const commandChannelIds = new Set(
  process.env.COMMAND_CHANNEL_IDS.split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);

if (commandChannelIds.size === 0) {
  console.error("COMMAND_CHANNEL_IDS must contain at least one channel ID.");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName("shalom")
    .setDescription("מציג ברכה בעברית"),
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("בודק אם הבוט זמין"),
].map((command) => command.toJSON());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

async function registerGuildCommands() {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_ID,
    ),
    { body: commands },
  );
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Signed in as ${readyClient.user.tag}`);
});

client.on(Events.GuildMemberAdd, async (member) => {
  const channel = await member.guild.channels
    .fetch(process.env.WELCOME_CHANNEL_ID)
    .catch((error) => {
      console.error("Could not fetch the welcome channel:", error.message);
      return null;
    });

  if (!channel?.isTextBased() || !channel.isSendable()) {
    console.error("WELCOME_CHANNEL_ID is not a sendable text channel.");
    return;
  }

  const welcome = `ברוך הבא/ה לשרת, ${member}! Welcome!`;
  await channel.send({ content: welcome }).catch((error) => {
    console.error("Could not send the welcome message:", error.message);
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (!commandChannelIds.has(interaction.channelId)) {
    await interaction.reply({
      content: "אפשר להשתמש בפקודות רק בערוצים המיועדים לכך. תודה!",
      ephemeral: true,
    });
    return;
  }

  const response = interaction.commandName === "shalom"
    ? `שלום ${interaction.user}! שמחים לראות אותך.`
    : `אני כאן, ${interaction.user}!`;

  await interaction.reply({ content: response, ephemeral: true });
});

async function start() {
  try {
    await registerGuildCommands();
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error("Bot startup failed:", error);
    process.exitCode = 1;
  }
}

start();
