# 翰霖法律事務所 官方網站

翰霖法律事務所的官方網站，使用 Astro 5 + Tailwind CSS v4 建構，部署於 Cloudflare Pages。

## 技術架構

| 技術 | 說明 |
|------|------|
| **Astro 5** | 靜態網站生成框架 |
| **Tailwind CSS v4** | CSS 框架（via `@tailwindcss/vite`） |
| **Content Collections** | Astro 內容集合管理律師與案例資料 |
| **PagesCMS** | 基於 `.pages.yml` 的視覺化內容編輯器 |
| **Cloudflare Pages** | 靜態網站託管（staging + production） |

## 目錄結構

```
linpto-web/
├── astro.config.mjs          # Astro 設定
├── package.json               # 專案設定與依賴
├── tsconfig.json              # TypeScript 設定
├── wrangler.toml              # Cloudflare Workers 設定
├── .pages.yml                 # PagesCMS 設定
├── scripts/
│   ├── create-rc.sh           # 建立發布候選
│   └── release.sh             # 發布至正式環境
├── src/
│   ├── components/
│   │   ├── assets/            # Logo, ThemeToggle
│   │   ├── cases/             # 案例卡片元件
│   │   ├── fundations/        # 基礎元件 (Text, Button, Wrapper, etc.)
│   │   ├── global/            # Footer, Search
│   │   ├── landing/           # Hero, PracticeAreas, ServiceProcess
│   │   ├── lawyers/           # 律師卡片元件
│   │   └── navigation/        # DesktopNav, MobileNav, NavigationLinks
│   ├── content/
│   │   ├── config.ts          # 內容集合 Schema 定義
│   │   ├── lawyers/           # 律師 Markdown 檔案
│   │   └── cases/             # 案例 Markdown 檔案
│   ├── images/                # 圖片資源
│   ├── layouts/
│   │   └── BaseLayout.astro   # 基礎版面配置
│   ├── pages/
│   │   ├── index.astro        # 首頁
│   │   ├── philosophy.astro   # 服務理念
│   │   ├── lawyers/           # 律師介紹
│   │   ├── practice-areas.astro # 專業領域
│   │   ├── process.astro      # 服務流程
│   │   ├── cases/             # 實務案例
│   │   ├── contact.astro      # 聯絡方式
│   │   └── 404.astro          # 404 頁面
│   └── styles/
│       ├── global.css         # 全域樣式與色彩主題
│       └── shiki.css          # 程式碼語法高亮
```

## 頁面說明

| 路徑 | 說明 |
|------|------|
| `/` | 首頁 — Hero 標語、專業領域、服務流程、精選案例 |
| `/philosophy` | 服務理念與宗旨 |
| `/lawyers` | 律師介紹列表 |
| `/lawyers/[slug]` | 律師詳細介紹 |
| `/practice-areas` | 專業領域（六大領域） |
| `/process` | 服務流程（四步驟） |
| `/cases` | 實務案例列表 |
| `/cases/[slug]` | 案例詳細內容 |
| `/contact` | 聯絡方式 |

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (localhost:4321)
npm run dev

# 建置正式版本
npm run build

# 預覽正式版本
npm run preview
```

## 分支策略與部署

### 分支說明

| 分支 | 用途 | 部署環境 |
|------|------|----------|
| `dev` | 日常開發 | Dev（頁面標題帶 `(Dev)` 標記） |
| `preprod` | 預發布候選 | Staging / QA 驗證 |
| `main` | 正式版本 | Production |

### 部署至 Cloudflare Workers

本專案使用 Cloudflare Workers + Static Assets 部署。

**建置設定：**
- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler deploy`
- **配置檔**: `wrangler.toml`

### 發布流程

```
dev → (create-rc) → preprod + tag → (release) → main
```

#### 1. 建立發布候選 (Release Candidate)

將 `dev` HEAD 合併至 `preprod` 分支並建立版本標籤：

```bash
./scripts/create-rc.sh <version>

# 範例
./scripts/create-rc.sh 0.2.0
# → 建立 preprod 分支（from dev HEAD）
# → 建立 v0.2.0 標籤
```

#### 2. 發布至正式環境 (Production Release)

將指定標籤的候選版本合併至 `main`：

```bash
./scripts/release.sh <tag>

# 範例
./scripts/release.sh v0.2.0
# → 將 v0.2.0 合併至 main
# → Cloudflare 自動部署
```

### 自訂域名

在 Cloudflare Workers 專案設定中新增自訂域名。

## 內容管理 (PagesCMS)

### 設定

1. 將專案推送至 GitHub
2. 登入 [PagesCMS](https://pagescms.org/)
3. 連結 GitHub 倉庫
4. 即可在 CMS 介面中編輯律師資料與案例內容

### 手動編輯

直接編輯 `src/content/` 目錄下的 Markdown 檔案：

- **新增律師**: 在 `src/content/lawyers/` 新增 `.md` 檔案
- **新增案例**: 在 `src/content/cases/` 新增 `.md` 檔案

### 移除 CMS

如不需要 CMS，刪除 `.pages.yml` 檔案即可。內容集合仍可正常運作。

## 色彩主題

目前使用深海軍藍 + 暖金色調：
- **Accent (navy)**: 用於連結、按鈕、標誌性色彩
- **Gold**: 可用於次要強調
- **Base**: 中性灰色系

色彩可在 `src/styles/global.css` 的 `@theme` 區塊中調整。

## 聯絡資訊

- **事務所**: 翰霖法律事務所
- **電話**: 02-2585-2626
- **傳真**: 02-2596-3737
- **地址**: 台北市中正區重慶南路一段99號11樓之9
