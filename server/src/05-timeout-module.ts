//run setsimeout

import { setTimeout } from "node:timers/promises";

async function run() {
  console.log("Start");
  await setTimeout(1000);
  console.log("End");
}

run();

function runSetTimeout(): void {
  console.log("Start-2");
  globalThis.setTimeout(() => {
    console.log("End-3");
  }, 1000);
  console.log("End-2");
}

runSetTimeout();

function runSetInterval(): void {
  console.log("Start-3");
  const timer = globalThis.setInterval(() => {
    console.log("En-5");
    clearInterval(timer);
  }, 1000);
  console.log("End-6");
}

runSetInterval();

function runSetImmediate(): void {
  console.log("Start-4");
  globalThis.setImmediate(() => {
    console.log("End-7");
  });
  console.log("synccode After setImmediate");
}
runSetImmediate();
