import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

const c = colors;

async function main() {
  console.log(c.bold.green("Welcome boss!"));

  while (true) {
    const userInput = readlineSync.question(c.yellow("You: "));

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      });

      //get response
      const text = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(c.green("Bot: ") + text);
        return;
      }

      console.log(c.green("Bot: ") + text);
    } catch (error) {
      console.error(c.red(error));
    }
  }
}

main();
