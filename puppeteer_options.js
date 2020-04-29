module.exports = {
    timeout: 0,
    waitUntil:  "domcontentloaded",
    headless: false,
    javascriptEnabled: false,
    disabledResources: ['stylesheet', 'media', 'font', 'script', 'image'],
    userDataDir: "./data",
    cacheEnabled: true,
    halls: ["ENI-NJOKU+HALL","PROFESSOR+SABURI+BIOBAKU+HALL","MARIERE+HALL","JAJA","SHODEINDE"],
    femaleHalls: ["MOREMI+HALL", 'HONOURS+HALL', 'KOFO+ADEMOLA+HALL', 'MADAM+TINUBU+HALL', 'QUEEN+AMINA+HALL', 'FAGUNWA+HALL','ALIYU+MAKAMA+BIDA+HALL']
};