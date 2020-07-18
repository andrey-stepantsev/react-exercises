import { createInterface } from "readline";
import { run } from "./Runner";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(): Promise<null> {
  return new Promise((resolve) => {
    readline.question("> ", (answer: string): void => {
      const result = run(answer);
      console.log(result);
      resolve();
    });
  });
}

async function app(): Promise<null> {
  while (true) {
    await question();
  }
}

app();
