import { z } from "zod/v4";

export * from "zod";
export { file, formData, numeric, text, zfd } from "zod-form-data";
export const boolean = () => z.preprocess((value) => (value === "false" ? false : Boolean(value)), z.boolean());

export const id = () => z.string();
