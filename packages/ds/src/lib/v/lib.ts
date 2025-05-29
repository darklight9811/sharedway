import { z } from "zod";

export * from "zod";
export { file, formData, numeric, text, zfd } from "zod-form-data";

export const id = () => z.string();
