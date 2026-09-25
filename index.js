const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const http = require('http');

// 1. فتح خادم ويب وهمي لكي لا يغلق موقع Render البوت
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('C9X Bot is Alive!\n');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌍 خادم الويب الوهمي يعمل على منفذ: ${PORT}`);
});

// 2. إعدادات البوت الأساسية
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages 
    ] 
});

client.once('ready', () => {
    console.log(`🤖 البوت جاهز ويعمل بنظام صورة العضو الكبيرة!`);
});

client.on('guildMemberAdd', member => {
    const welcomeChannelId = process.env.CHANNEL_ID; 
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
        // جلب رابط صورة العضو الشخصية بحجم كبير واضح
        const memberAvatar = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

        // تصميم لوحة الترحيب التي تضع صورة العضو كخلفية رئيسية كبيرة بالأسفل
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('👋 𝙼𝙴𝙼𝙱𝙴𝚁 𝙹𝙾𝙸𝙽𝙴𝙳')
            .setDescription(`يا هلا ومرحباً بك يا ${member} في عائلة **𝙲𝟿𝚇 𝙲𝙾𝙼𝙼𝚄𝙽𝙸𝚃𝚈** ✨\nنورتنا وانضمامك يسعدنا جداً! 🌐\n\n📌 حياك الله في شاتنا العام، يرجى قراءة القوانين لتجنب العقوبات، واستمتع بوقتك معنا!`)
            .setImage(memberAvatar) // وضع صورة العضو الكبيرة بالأسفل
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
