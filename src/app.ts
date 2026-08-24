import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const currentDirectory = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(currentDirectory, "../public")));

// ... tes routes ...

export default app;