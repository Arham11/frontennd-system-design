import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    slowMo: "120",
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.abbott.com/");

  const menuBtn = ".abt-icon.abt-icon-hamburger";
  await page.waitForSelector(menuBtn);
  await page.click(menuBtn);

  const newsroomsMenuLink = "aside > nav > ul > li:nth-child(7) a";
  await page.waitForSelector(newsroomsMenuLink);
  await page.click(newsroomsMenuLink);

  console.log("page loaded successful");
})();
