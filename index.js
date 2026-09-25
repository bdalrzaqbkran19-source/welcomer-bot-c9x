const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages 
    ] 
});

client.once('ready', () => {
    console.log(`🤖 البوت جاهز ويعمل الآن بنجاح!`);
});

client.on('guildMemberAdd', member => {
    const welcomeChannelId = process.env.CHANNEL_ID; 
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
        channel.send(`👋 𝙼𝙴𝙼𝙱𝙴𝚁 𝙹𝙾𝙸𝙽𝙴𝙳\n\nيا هلا ومرحباً بك يا ${member} في عائلة **𝙲𝟿𝚇 𝙲𝙾𝙼𝙼𝚄𝙽𝙸𝚃𝚈** ✨\nنورتنا وانضمامك يسعدنا جداً! 🌐\n\n📌 حياك الله في شاتنا العام، يرجى قراءة القوانين لتجنب العقوبات، واستمتع بوقتك معنا!`);
    }
});

client.login(process.env.DISCORD_TOKEN);
