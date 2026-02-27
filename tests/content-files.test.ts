import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// Utility to read frontmatter from markdown files
function parseFrontmatter(content: string) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    const lines = match[1].split("\n");
    const data: Record<string, string> = {};
    for (const line of lines) {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
            data[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
        }
    }
    return data;
}

const contentDir = resolve(import.meta.dirname, "../src/content");

describe("Lawyer content files", () => {
    const lawyersDir = resolve(contentDir, "lawyers");

    it("lawyers directory exists", () => {
        expect(existsSync(lawyersDir)).toBe(true);
    });

    const lawyerFiles = existsSync(lawyersDir)
        ? readdirSync(lawyersDir).filter((f: string) => f.endsWith(".md"))
        : [];

    it("has at least one lawyer profile", () => {
        expect(lawyerFiles.length).toBeGreaterThan(0);
    });

    for (const file of lawyerFiles) {
        describe(`lawyers/${file}`, () => {
            const content = readFileSync(resolve(lawyersDir, file), "utf-8");
            const frontmatter = parseFrontmatter(content);

            it("has valid frontmatter", () => {
                expect(frontmatter).not.toBeNull();
            });

            it("has a name field", () => {
                expect(frontmatter?.name).toBeDefined();
                expect(frontmatter!.name.length).toBeGreaterThan(0);
            });

            it("has a title field", () => {
                expect(frontmatter?.title).toBeDefined();
            });
        });
    }
});

describe("Case content files", () => {
    const casesDir = resolve(contentDir, "cases");

    it("cases directory exists", () => {
        expect(existsSync(casesDir)).toBe(true);
    });

    const caseFiles = existsSync(casesDir)
        ? readdirSync(casesDir).filter((f: string) => f.endsWith(".md"))
        : [];

    it("has at least one case study", () => {
        expect(caseFiles.length).toBeGreaterThan(0);
    });

    for (const file of caseFiles) {
        describe(`cases/${file}`, () => {
            const content = readFileSync(resolve(casesDir, file), "utf-8");
            const frontmatter = parseFrontmatter(content);

            it("has valid frontmatter", () => {
                expect(frontmatter).not.toBeNull();
            });

            it("has a title field", () => {
                expect(frontmatter?.title).toBeDefined();
                expect(frontmatter!.title.length).toBeGreaterThan(0);
            });

            it("has a category field", () => {
                expect(frontmatter?.category).toBeDefined();
            });

            it("has a summary field", () => {
                expect(frontmatter?.summary).toBeDefined();
            });
        });
    }
});
