import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const srcDir = resolve(import.meta.dirname, "../src");

describe("Navigation links", () => {
    const navContent = readFileSync(
        resolve(srcDir, "components/navigation/NavigationLinks.astro"),
        "utf-8"
    );

    const requiredPages = [
        { label: "首頁", href: "/" },
        { label: "服務理念", href: "/philosophy" },
        { label: "律師介紹", href: "/lawyers" },
        { label: "專業領域", href: "/practice-areas" },
        { label: "服務流程", href: "/process" },
        { label: "實務案例", href: "/cases" },
        { label: "聯絡我們", href: "/contact" },
    ];

    for (const page of requiredPages) {
        it(`includes ${page.label} (${page.href})`, () => {
            expect(navContent).toContain(page.href);
            expect(navContent).toContain(page.label);
        });
    }
});

describe("SEO metadata", () => {
    it("Meta.astro has correct page title", () => {
        const content = readFileSync(
            resolve(srcDir, "components/fundations/head/Meta.astro"),
            "utf-8"
        );
        expect(content).toMatch(/<title>翰霖法律事務所/);
    });

    it("Seo.astro has correct page title", () => {
        const content = readFileSync(
            resolve(srcDir, "components/fundations/head/Seo.astro"),
            "utf-8"
        );
        expect(content).toContain("翰霖法律事務所");
    });
});

describe("Footer contact info", () => {
    const footer = readFileSync(
        resolve(srcDir, "components/global/Footer.astro"),
        "utf-8"
    );

    it("has phone number", () => {
        expect(footer).toContain("02-2585-2626");
    });

    it("has fax number", () => {
        expect(footer).toContain("02-2596-3737");
    });

    it("has address", () => {
        expect(footer).toContain("台北市中正區重慶南路一段99號11樓之9");
    });
});

describe("Required pages exist", () => {
    const pagesDir = resolve(srcDir, "pages");
    const requiredFiles = [
        "index.astro",
        "philosophy.astro",
        "practice-areas.astro",
        "process.astro",
        "contact.astro",
        "404.astro",
        "lawyers/index.astro",
        "lawyers/[...slug].astro",
        "cases/index.astro",
        "cases/[...slug].astro",
    ];

    for (const file of requiredFiles) {
        it(`pages/${file} exists`, () => {
            const exists = (() => {
                try {
                    readFileSync(resolve(pagesDir, file));
                    return true;
                } catch {
                    return false;
                }
            })();
            expect(exists).toBe(true);
        });
    }
});
