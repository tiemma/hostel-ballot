const path = require("path");
const puppeteer = require("puppeteer");
const fields = require("./fields");
const options = require("./puppeteer_options");

require("dotenv").config();

console.log(fields);
console.log(options);

const extenstionPath = path.resolve(__dirname, "./chrome_extension/");

let count = 1;

let delay = 10000;

let trials = 1;

let balloting = false;

(async () => {
	const browser = await puppeteer.launch({
		timeout: options.timeout,
		headless: options.headless,
		userDataDir: `${options.userDataDir}-${Math.floor(Math.random() * 4)}`,
		args: [
			`--load-extension=${extenstionPath}`,
			`--disable-extensions-except=${extenstionPath}`
		]
	});

	let page = await browser.newPage();

	await page.setJavaScriptEnabled(options.javascriptEnabled);

	await page.setCacheEnabled(options.cacheEnabled);

	async function ballot(hallId) {
		while (balloting) {
			await page.goto(hallId, {timeout: options.timeout});

			await page.waitForSelector(fields.BALLOT_SUBMIT_BUTTON, {
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});

			await page.click(fields.BALLOT_SUBMIT_BUTTON);

			await page.waitForNavigation({
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});

			await page.waitForSelector(fields.ERROR_DIV, {
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});

			const spaceFree = await page.evaluate(
				() => document.querySelector("#errordiv").textContent
			);

			console.log(`Answer for request ${count} is ${spaceFree}`);

			count++;

			if (!spaceFree.includes("Sorry")) {
				console.log("Space Acquired");
				balloting = false;
			}
		}
		// if (delay > 100000) {
		// 	delay = 10000;
		// }

		// setTimeout(async () => {
		// 	await page.goto(hallId, {timeout: options.timeout});

		// 	await page.waitForSelector(fields.BALLOT_SUBMIT_BUTTON, {
		// 		timeout: options.timeout,
		// 		waitUntil: options.waitUntil
		// 	});

		// 	await page.click(fields.BALLOT_SUBMIT_BUTTON);
		// }, (delay += 10000));
	}

	async function restartScript(status, statusText) {
		try {
			console.log(`${status}-${statusText}-${trials}`);
			trials++;
			if (page.url().includes("AccommodationReservation")) {
				const hall =
					options.halls[Math.floor(Math.random() * options.halls.length)];

				const hallId =
					page
						.url()
						.split("/")
						.splice(0, 4)
						.join("/") + `/AccommodationReservation.aspx?hallid=${hall}&room=`;

				console.log("Hall is: " + hall + " " + hallId);
				await ballot(hallId);
			} else {
				balloting = false;
				await run();
			}
		} catch (error) {
			console.log("Restart Script Error: " + error.message);
		}
	}

	// page.on("requestfailed", async request => {
	// 	if (request.resourceType() === "document") {
	// 		try {
	// 			const response = request.response();
	// 			const responseStatus = response ? response.status() : "5xx";
	// 			const responseStatusText = response ? response.statusText() : "Server Error";
	// 			await restartScript(responseStatus, responseStatusText);
	// 		} catch (error) {
	// 			console.log("Request Failed Error: " + error.message);
	// 		}
	// 	}
	// });

	// page.on("requestfinished", async request => {
	// 	if (request.resourceType() === "document") {
	// 		try {
	// 			const response = request.response();
	// 			const responseStatus = response.status();
	// 			if (response.ok()) {
	// 				const responseText = await response.text();
	// 				if (responseText.includes("Gateway Timeout") || responseText.includes('Internal Server Error')) {
	// 					await restartScript(responseStatus, "Gateway Timeout | Internal Server Error");
	// 				}
	// 			}
	// 		} catch (error) {
	// 			console.log("Request Finished Error: " + error.message);
	// 		}
	// 	}
	// });

	page.on("load", () => {
		page.title().then(title => {
			if (
				title.includes("5") ||
				title.includes("Error") ||
				title.includes("accommodation.unilag.edu.ng")
			) {
				return page.reload({
					timeout: options.timeout,
					waitUntil: options.waitUntil
				});
			}
			if (page.url().includes("Login") || page.url().includes('default')) {
				page
					.click(fields.LOGIN_USERNAME_ID)
					.then(() => {
						return page.keyboard.type(process.env.MATRIC_NO);
					})
					.then(() => {
						return page.click(fields.LOGIN_PASSWORD_ID);
					})
					.then(() => {
						return page.keyboard.type(process.env.PASSWORD);
					})
					.then(() => {
						return page.click(fields.BUTTON_SELECTOR);
					});
			}
			if (
				page.url().includes("AccommodationReservation") ||
				page.url().includes('Home')
			) {
				const hall =
					options.halls[Math.floor(Math.random() * options.halls.length)];

				const hallId =
					page
						.url()
						.split("/")
						.splice(0, 4)
						.join("/") + `/AccommodationReservation.aspx?hallid=${hall}&room=`;
				return ballot(hallId);
			}
		});
	});

	async function run() {
		try {
			await page.goto("http://accommodation.unilag.edu.ng/", {
				timeout: options.timeout
			});

			await page.waitForSelector(fields.LOGIN_USERNAME_ID, {
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});
			await page.waitForSelector(fields.LOGIN_PASSWORD_ID, {
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});
			console.log("------------------Hmmmm--------------------");
			await page.click(fields.LOGIN_USERNAME_ID);
			await page.keyboard.type(process.env.MATRIC_NO);

			await page.click(fields.LOGIN_PASSWORD_ID);
			await page.keyboard.type(process.env.PASSWORD);

			await page.click(fields.BUTTON_SELECTOR);

			await page.waitForNavigation({
				timeout: options.timeout,
				waitUntil: options.waitUntil
			});

			const hall =
				options.halls[Math.floor(Math.random() * options.halls.length)];

			const hallId =
				page
					.url()
					.split("/")
					.splice(0, 4)
					.join("/") + `/AccommodationReservation.aspx?hallid=${hall}&room=`;

			console.log("Hall is: " + hall + " " + hallId);
			await ballot(hallId);
		} catch (error) {
			console.log("Error:" + error.message);
			process.exit();
		}
	}
	balloting = true;
	while (balloting) {
		await run();
	}
})();
