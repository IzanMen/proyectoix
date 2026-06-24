import { spawn } from "node:child_process";

const commands = [
  {
    name: "api",
    args: ["--filter", "@workspace/api-server", "run", "dev"],
  },
  {
    name: "web",
    args: ["--filter", "@workspace/ix-landing", "run", "dev"],
  },
];

const children = new Set();
let shuttingDown = false;

function stopAll(signal = "SIGTERM") {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
}

for (const command of commands) {
  const child = spawn("pnpm", command.args, {
    stdio: "inherit",
    env: process.env,
  });

  children.add(child);

  child.on("exit", (code, signal) => {
    children.delete(child);
    if (!shuttingDown && code !== 0) {
      console.error(
        `[dev:${command.name}] exited with ${signal ?? `code ${code}`}`,
      );
      stopAll();
      process.exitCode = code ?? 1;
    }
  });
}

process.on("SIGINT", () => {
  stopAll("SIGINT");
});

process.on("SIGTERM", () => {
  stopAll("SIGTERM");
});
