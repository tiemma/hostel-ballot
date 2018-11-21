module.exports = {
    timeout: 0,
    waitUntil: 'domcontentloaded',
    headless: false,
    javascriptEnabled: false,
    disabledResources: ['stylesheet', 'media', 'font', 'script', 'image'],
    userDataDir: "./data",
    cacheEnabled: true,
    halls: ["MOREMI+HALL", 'HONOURS+HALL', 'KOFO+ADEMOLA+HALL', 'MADAM+TINUBU+HALL', 'QUEEN+AMINA+HALL', 'FAGUNWA+HALL','ALIYU+MAKAMA+BIDA+HALL']
};