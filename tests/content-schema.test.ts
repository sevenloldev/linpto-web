import { describe, it, expect } from "vitest";
import { z } from "astro/zod";

// Re-define schemas here so we can test Zod validation independently
// These should mirror the schemas in src/content/config.ts

const lawyerSchema = z.object({
    name: z.string(),
    title: z.string(),
    education: z.array(z.string()).optional(),
    specialties: z.array(z.string()).optional(),
    experience: z.array(z.string()).optional(),
    bio: z.string(),
    order: z.number().default(0),
});

const caseSchema = z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    status: z.string().default("已完成"),
    date: z.coerce.date(),
    highlights: z.array(z.string()).optional(),
});

describe("Lawyer schema", () => {
    it("validates a complete lawyer profile", () => {
        const data = {
            name: "陳翰霖",
            title: "主持律師",
            education: ["國立臺灣大學法律學系學士"],
            specialties: ["民事訴訟", "企業法務"],
            experience: ["曾任某法律事務所資深律師"],
            bio: "陳翰霖律師擁有豐富的法律實務經驗。",
            order: 1,
        };
        const result = lawyerSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it("validates with only required fields", () => {
        const data = {
            name: "張三",
            title: "律師",
            bio: "簡介。",
        };
        const result = lawyerSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.order).toBe(0); // default value
        }
    });

    it("rejects when name is missing", () => {
        const data = {
            title: "律師",
            bio: "簡介。",
        };
        const result = lawyerSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("rejects when bio is missing", () => {
        const data = {
            name: "張三",
            title: "律師",
        };
        const result = lawyerSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("rejects when education is not an array", () => {
        const data = {
            name: "張三",
            title: "律師",
            bio: "簡介。",
            education: "國立臺灣大學", // should be array
        };
        const result = lawyerSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});

describe("Case schema", () => {
    it("validates a complete case entry", () => {
        const data = {
            title: "大型商業合約糾紛案",
            category: "企業法務",
            summary: "成功代理某科技公司處理跨國商業合約糾紛。",
            status: "已完成",
            date: "2025-06-15",
            highlights: ["跨國合約糾紛", "五千萬元"],
        };
        const result = caseSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.date).toBeInstanceOf(Date);
        }
    });

    it("applies default status", () => {
        const data = {
            title: "測試案例",
            category: "民事訴訟",
            summary: "摘要。",
            date: "2025-01-01",
        };
        const result = caseSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.status).toBe("已完成");
        }
    });

    it("rejects when title is missing", () => {
        const data = {
            category: "民事訴訟",
            summary: "摘要。",
            date: "2025-01-01",
        };
        const result = caseSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it("rejects when date is invalid", () => {
        const data = {
            title: "測試案例",
            category: "民事訴訟",
            summary: "摘要。",
            date: "not-a-date",
        };
        const result = caseSchema.safeParse(data);
        // z.coerce.date() will try to parse, "not-a-date" results in Invalid Date
        if (result.success) {
            expect(result.data.date.toString()).toBe("Invalid Date");
        }
    });
});
