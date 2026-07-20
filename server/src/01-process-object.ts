import process from "node:process";
const nodeEnv = process.env.NODE_ENV ?? "development";
const command = process.argv[2] ?? "start";
const shouldfail = process.argv.includes("--fail") ?? false;
const shouldCrash = process.argv.includes("--crash") ?? false;

process.on("exit", (code) => {
  console.log(`Process exited with code: ${code}`);
});

function runApp(): void {
  console.log({
    command,
  });
  if (shouldfail) {
    process.exit(1);
  }
  if (shouldCrash) {
    throw new Error("crash");
    process.exit(1);
  }
}

runApp();
