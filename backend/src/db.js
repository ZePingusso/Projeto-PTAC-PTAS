import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "data.json")
console.log(DB_PATH)

export async function writeData(data) {
    await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function readData() {
    try {
        const raw = await readFile(DB_PATH, "utf-8");
        return JSON.parse(raw);
    } catch (error) {
        if (error.code === "ENOENT") return []
        throw error;
    }
}