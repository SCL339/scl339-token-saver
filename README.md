1|     1|     1|# SCL339 Token Saver
     2|     2|     2|
     3|     3|     3|> 💰 **LLM Token Optimization CLI Tool** — Analyze prompts, generate optimized templates, and measure token savings. Reduce LLM API costs by up to 60%.
     4|     4|     4|
     5|     5|     5|[![npm version](https://img.shields.io/npm/v/scl339-token-saver)](https://www.npmjs.com/package/scl339-token-saver)
     6|     6|     6|[![npm downloads](https://img.shields.io/npm/dm/scl339-token-saver)](https://www.npmjs.com/package/scl339-token-saver)
     7|     7|     7|[![GitHub](https://img.shields.io/github/license/SCL339/scl339-token-saver)](LICENSE)
     8|     8|     8|[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SCL339/scl339-token-saver/pulls)
     9|     9|     9|
    10|    10|    10|---
    11|    11|    11|
    12|    12|    12|## 🚀 Features
    13|    13|    13|
    14|    14|    14|- **Analyze** any prompt file and get token optimization scores
    15|    15|    15|- **Identify** specific savings opportunities (verbose instructions, repetition, excessive examples)
    16|    16|    16|- **Generate** optimized prompt templates for common tasks (code review, debugging, refactoring)
    17|    17|    17|- **Export** detailed JSON reports for CI/CD pipelines
    18|    18|    18|- **Zero dependencies** — pure Node.js, no npm install overhead
    19|    19|    19|
    20|    20|    20|## 📦 Installation
    21|    21|    21|
    22|    22|    22|```bash
    23|    23|    23|# Via npm (recommended)
    24|    24|    24|npm install -g scl339-token-saver
    25|    25|    25|
    26|    26|    26|# Or clone from GitHub
    27|    27|    27|git clone https://github.com/shuchengle/scl339-token-saver.git
    28|    28|    28|cd scl339-token-saver
    29|    29|    29|npm link
    30|    30|    30|```
    31|    31|    31|
    32|    32|    32|## 🎯 Usage
    33|    33|    33|
    34|    34|    34|### Analyze a prompt
    35|    35|    35|
    36|    36|    36|```bash
    37|    37|    37|# Analyze a file
    38|    38|    38|token-saver analyze my-prompt.txt
    39|    39|    39|
    40|    40|    40|# Pipe input
    41|    41|    41|cat prompt.md | token-saver analyze
    42|    42|    42|```
    43|    43|    43|
    44|    44|    44|### Generate optimized templates
    45|    45|    45|
    46|    46|    46|```bash
    47|    47|    47|# List all templates
    48|    48|    48|token-saver template
    49|    49|    49|
    50|    50|    50|# Show specific template
    51|    51|    51|token-saver template code-review
    52|    52|    52|token-saver template debug
    53|    53|    53|token-saver template explain
    54|    54|    54|token-saver template refactor
    55|    55|    55|```
    56|    56|    56|
    57|    57|    57|### Generate a report
    58|    58|    58|
    59|    59|    59|```bash
    60|    60|    60|token-saver report prompt.txt report.json
    61|    61|    61|```
    62|    62|    62|
    63|    63|    63|### Sample output
    64|    64|    64|
    65|    65|    65|```
    66|    66|    66|══════════════════════════════════════════════
    67|    67|    67|  TOKEN SAVER — Prompt Analysis Report
    68|    68|    68|══════════════════════════════════════════════
    69|    69|    69|
    70|    70|    70|  Total characters:  2,456
    71|    71|    71|  Estimated tokens:  614
    72|    72|    72|  Line count:        87
    73|    73|    73|  Optimization:      72.3/100
    74|    74|    74|
    75|    75|    75|  ⚠  Optimization opportunities:
    76|    76|    76|
    77|    77|    77|  🟡  Too many instruction lines — consider consolidating
    78|    78|    78|      Potential savings: ~45 tokens
    79|    79|    79|  🟢  Excessive blank lines — reduce to improve token efficiency
    80|    80|    80|      Potential savings: ~12 tokens
    81|    81|    81|
    82|    82|    82|  ──────────────────────────────────────────
    83|    83|    83|  Total potential savings: ~168 tokens (27%)
    84|    84|    84|  Estimated cost reduction: ~27%
    85|    85|    85|```
    86|    86|    86|
    87|    87|    87|## 🔧 CLI Commands
    88|    88|    88|
    89|    89|    89|| Command | Description |
    90|    90|    90||---------|-------------|
    91|    91|    91|| `token-saver analyze <file>` | Analyze a prompt file for optimization opportunities |
    92|    92|    92|| `token-saver template [type]` | Display optimized prompt templates |
    93|    93|    93|| `token-saver report <in> [out]` | Generate a detailed JSON report |
    94|    94|    94|| `token-saver help` | Show help information |
    95|    95|    95|
    96|    96|    96|## 🧩 Templates
    97|    97|    97|
    98|    98|    98|The built-in templates are designed to be **minimal yet effective** — focused prompts that get the job done without wasted tokens:
    99|    99|    99|
   100|   100|   100|- **code-review** — Systematic code review with severity classification
   101|   101|   101|- **debug** — Structured debugging workflow
   102|   102|   102|- **explain** — Three-level code explanation
   103|   103|   103|- **refactor** — Readability, performance, maintainability improvements
   104|   104|   104|
   105|   105|   105|## 🔗 Related SCL339 Projects
   106|   106|   106|
   107|   107|   107|- [**scl339-skill-pack**](https://github.com/SCL339/scl339-skill-pack) — AI coding assistant skill pack with 12+ skills for Claude Code, Codex, and Cursor
   108|   108|   108|- [**auto-pr-review-action**](https://github.com/SCL339/auto-pr-review-action) — Automated PR review GitHub Action for code quality automation
   109|   109|   109|
   110|   110|   110|## 🤖 GitHub Action
   111|   111|   111|
   112|   112|   112|Token Saver also works as a GitHub Action! Add it to your CI pipeline:
   113|   113|   113|
   114|   114|   114|```yaml
   115|   115|   115|name: Token Optimization Check
   116|   116|   116|on: [push, pull_request]
   117|   117|   117|jobs:
   118|   118|   118|  analyze:
   119|   119|   119|    runs-on: ubuntu-latest
   120|   120|   120|    steps:
   121|   121|   121|      - uses: actions/checkout@v4
   122|   122|   122|      - uses: shuchengle/scl339-token-saver@v1
   123|   123|   123|        with:
   124|   124|   124|          files: "prompts/*.md"
   125|   125|   125|          threshold: 20
   126|   126|   126|```
   127|   127|   127|
   128|   128|   128|
   129|---
   130|
   131|## 🤝 赞助支持 (Sponsor)
   132|
   133|如果这个项目对你有帮助，可以请我喝杯咖啡 ☕
   134|
   135|- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
   136|- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
   137|- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目
   138|
   139|## 📄 License
   140|
   141|
   142|   129|   129|
   143|   130|   130|MIT — see [LICENSE](LICENSE)
   144|   131|   131|
   145|   132|   132|---
   146|   133|   133|
   147|   134|   134|## ☕ Sponsor
   148|   135|   135|
   149|   136|   136|If this tool helps you save on LLM costs, consider supporting the project:
   150|   137|   137|
   151|   138|   138|**Alipay**: Scan the QR code or search for **shuchengle** on Alipay to sponsor.
   152|   139|   139|
   153|   140|   140|```
   154|   141|   141|支付宝扫一扫，赞助支持
   155|   142|   142|```
   156|   143|   143|
   157|   144|   144|Your support keeps the open source ecosystem thriving. Thank you! 🙏
   158|   145|   145|

---

## 🤝 赞助支持 (Sponsor)

如果这个项目对你有帮助，可以请我喝杯咖啡 ☕

- 💖 **支付宝 (Alipay)**: `18559219554` | 邮箱联系: `530765059@qq.com`
- ☁️ **DigitalOcean 联盟链接**: [免费 $200 额度](https://www.digitalocean.com/?refcode=scl339-01&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=SCL339)
- ⭐ **在 GitHub 上点 Star** 帮助更多人发现这个项目

## 📄 License
