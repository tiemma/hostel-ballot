module.exports = {
    timeout: 0,
    waitUntil: 'domcontentloaded',
    headless: false,
    javascriptEnabled: false,
    disabledResources: ['stylesheet', 'media', 'font', 'script', 'image'],
    userDataDir: "./data",
    cacheEnabled: true,
};