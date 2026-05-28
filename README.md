# SCL339 Token Saver

> 💰 **LLM Token Optimization CLI Tool** — Analyze prompts, generate optimized templates, and measure token savings. Reduce LLM API costs by up to 60%.

[![npm version](https://img.shields.io/npm/v/scl339-token-saver)](https://www.npmjs.com/package/scl339-token-saver)
[![npm downloads](https://img.shields.io/npm/dm/scl339-token-saver)](https://www.npmjs.com/package/scl339-token-saver)
[![GitHub](https://img.shields.io/github/license/shuchengle/scl339-token-saver)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shuchengle/scl339-token-saver/pulls)

---

## 🚀 Features

- **Analyze** any prompt file and get token optimization scores
- **Identify** specific savings opportunities (verbose instructions, repetition, excessive examples)
- **Generate** optimized prompt templates for common tasks (code review, debugging, refactoring)
- **Export** detailed JSON reports for CI/CD pipelines
- **Zero dependencies** — pure Node.js, no npm install overhead

## 📦 Installation

```bash
# Via npm (recommended)
npm install -g scl339-token-saver

# Or clone from GitHub
git clone https://github.com/shuchengle/scl339-token-saver.git
cd scl339-token-saver
npm link
```

## 🎯 Usage

### Analyze a prompt

```bash
# Analyze a file
token-saver analyze my-prompt.txt

# Pipe input
cat prompt.md | token-saver analyze
```

### Generate optimized templates

```bash
# List all templates
token-saver template

# Show specific template
token-saver template code-review
token-saver template debug
token-saver template explain
token-saver template refactor
```

### Generate a report

```bash
token-saver report prompt.txt report.json
```

### Sample output

```
══════════════════════════════════════════════
  TOKEN SAVER — Prompt Analysis Report
══════════════════════════════════════════════

  Total characters:  2,456
  Estimated tokens:  614
  Line count:        87
  Optimization:      72.3/100

  ⚠  Optimization opportunities:

  🟡  Too many instruction lines — consider consolidating
      Potential savings: ~45 tokens
  🟢  Excessive blank lines — reduce to improve token efficiency
      Potential savings: ~12 tokens

  ──────────────────────────────────────────
  Total potential savings: ~168 tokens (27%)
  Estimated cost reduction: ~27%
```

## 🔧 CLI Commands

| Command | Description |
|---------|-------------|
| `token-saver analyze <file>` | Analyze a prompt file for optimization opportunities |
| `token-saver template [type]` | Display optimized prompt templates |
| `token-saver report <in> [out]` | Generate a detailed JSON report |
| `token-saver help` | Show help information |

## 🧩 Templates

The built-in templates are designed to be **minimal yet effective** — focused prompts that get the job done without wasted tokens:

- **code-review** — Systematic code review with severity classification
- **debug** — Structured debugging workflow
- **explain** — Three-level code explanation
- **refactor** — Readability, performance, maintainability improvements

## 🔗 Related SCL339 Projects

- [**scl339-skill-pack**](https://github.com/shuchengle/scl339-skill-pack) — AI coding assistant skill pack with 12+ skills for Claude Code, Codex, and Cursor
- [**auto-pr-review-action**](https://github.com/shuchengle/auto-pr-review-action) — Automated PR review GitHub Action for code quality automation

## 🤖 GitHub Action

Token Saver also works as a GitHub Action! Add it to your CI pipeline:

```yaml
name: Token Optimization Check
on: [push, pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shuchengle/scl339-token-saver@v1
        with:
          files: "prompts/*.md"
          threshold: 20
```

## 📄 License

MIT — see [LICENSE](LICENSE)

---

## ☕ Sponsor

If this tool helps you save on LLM costs, consider supporting the project:

**Alipay**: Scan the QR code or search for **shuchengle** on Alipay to sponsor.

```
支付宝扫一扫，赞助支持
```

Your support keeps the open source ecosystem thriving. Thank you! 🙏
