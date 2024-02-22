import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title must contain at least one character").max(255),
    description: z.string().min(1, "Description must contain as least one character.")
});
