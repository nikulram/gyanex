import puppeteer from "puppeteer";

export const generateAIQuestion = async (topic) => {
  try {
    console.log(`Searching Google for: important questions about ${topic}`);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Perform Google search
    const searchURL = `https://www.google.com/search?q=important+questions+about+${encodeURIComponent(topic)}`;
    await page.goto(searchURL, { waitUntil: "domcontentloaded" });

    // Extract the first search result
    const result = await page.evaluate(() => {
      const questionElement = document.querySelector("h3");
      const snippetElement = document.querySelector(".VwiC3b"); 

      return {
        question: questionElement ? questionElement.innerText : "No question found.",
        answer: snippetElement ? snippetElement.innerText : "No answer found.",
      };
    });

    await browser.close();

    return {
      question: result.question,
      answer: result.answer,
    };
  } catch (error) {
    console.error("Google Search Scraping Error:", error);
    return { question: "Could not generate question", answer: "Try again later." };
  }
};
