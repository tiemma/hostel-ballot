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

Change the halls to include the hallid shortcodes  for the following hostels in the [puppeteer_options.js](puppeteer_options.js) file

```html
2018 BALLOTING

MALE
====
AccommodationRooms.aspx?hallid=ENI-NJOKU+HALL

AccommodationRooms.aspx?hallid=PROFESSOR+SABURI+BIOBAKU+HALL

AccommodationRooms.aspx?hallid=MARIERE+HALL

AccommodationRooms.aspx?hallid=JAJA


FEMALE
======
GATE
----
AccommodationRooms.aspx?hallid=QUEEN+AMINA+HALL

AccommodationRooms.aspx?hallid=KOFO+ADEMOLA+HALL

AccommodationRooms.aspx?hallid=KWAKU+ADADEVOH+HALL

NEW-HALL
--------
AccommodationRooms.aspx?hallid=ALIYU+MAKAMA+BIDA+HALL

AccommodationRooms.aspx?hallid=FAGUNWA+HALL

AccommodationRooms.aspx?hallid=MADAM+TINUBU+HALL


CAMPUS
------
AccommodationRooms.aspx?hallid=HONOURS+HALL

AccommodationRooms.aspx?hallid=MOREMI+HALL

```


From there, sit back and run

> npm start

You can run it multiple times in different browsers provided the data folder for it isn't in use.

The data folder has some custom configurations I did to make the page load faster.

The chrome extension makes the page load faster by disabling requests for css and othe media files.




