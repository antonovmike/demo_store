import path from "path";
import { fileURLToPath } from "url";

export function getDirname(metaUrl: string): string {
  try {
    return path.dirname(fileURLToPath(metaUrl));
  } catch (err) {
    return __dirname;
  }
}
