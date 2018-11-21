# hostel-ballot
Puppeteer ballot code


To use it, kindly do

> npm install

No need to touch the fields.js file

For the right configuration, check the puppeteer options file


```javascript 1.8 

module.exports = {
    timeout: 0,
    waitUntil: 'domcontentloaded',
    headless: false,
    javascriptEnabled: false,
    disabledResources: ['stylesheet', 'media', 'font', 'script', 'image'],
    userDataDir: "./data",
    cacheEnabled: true,
    halls: ["MOREMI+HALL", 'HONOURS+HALL']
};

```

Change the halls to include the hallid shortcodes  for the  hostels you want to ballot with in the halls side of the [puppeteer_options.js](puppeteer_options.js) file

```html
2018 BALLOTING

MALE
====
ENI-NJOKU+HALL

PROFESSOR+SABURI+BIOBAKU+HALL

MARIERE+HALL

JAJA


FEMALE
======
GATE
----
QUEEN+AMINA+HALL

KOFO+ADEMOLA+HALL

KWAKU+ADADEVOH+HALL

NEW-HALL
--------
ALIYU+MAKAMA+BIDA+HALL

FAGUNWA+HALL

MADAM+TINUBU+HALL


CAMPUS
------
HONOURS+HALL

MOREMI+HALL

```

Add the ones you want to use to ballot in the halls array.

From there, sit back and run

> npm start

You can run it multiple times in different browser instances by opening a new terminal,
Try it again if it fails and I  setup four data folders and it will work provided the data folder it picks at random isn't in use.

The data folder has some custom configurations I did to make the page load faster hence why it's there, you can copy new ones and increase the number to run more browsers and brute force it to hell.

The chrome extension folder is there to make the page load faster by disabling requests for css and othe media files.




