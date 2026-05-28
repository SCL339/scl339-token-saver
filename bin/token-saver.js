#!/usr/bin/env node

/**
 * scl339-token-saver — LLM Token Optimization CLI
 *
 * Commands:
 *   analyze   Analyze a prompt for token optimization opportunities
 *   template  Generate optimized prompt templates
 *   report    Generate token saving report
 */

const fs = require('fs');
const path = require('path');

const VERSION = '1.0.0';

// Simple token estimator (chars / ~4 for English)
function estimateTokens(text) {
  // More accurate: GPT tokenizer approximates ~4 chars per token
  return Math.round(text.length / 4);
}

function analyzePrompt(input) {
  const lines = input.split('\n');
  const totalChars = input.length;
  const totalTokens = estimateTokens(input);
  const lineCount = lines.length;

  // Find optimization opportunities
  const issues = [];

  // Check for verbose instructions
  const instructionLines = lines.filter(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./));
  if (instructionLines.length > 20) {
    issues.push({
      type: 'verbose-instructions',
      severity: 'medium',
      detail: `${instructionLines.length} instruction lines — consider consolidating related instructions`,
      savings: Math.round(instructionLines.length * 0.3)
    });
  }

  // Check for redundant whitespace
  const blankLines = lines.filter(l => l.trim() === '').length;
  if (blankLines > 10) {
    issues.push({
      type: 'excessive-blank-lines',
      severity: 'low',
      detail: `${blankLines} blank lines — reduce to improve token efficiency`,
      savings: blankLines - 5
    });
  }

  // Check for long lines
  const longLines = lines.filter(l => l.length > 200);
  if (longLines.length > 0) {
    issues.push({
      type: 'long-lines',
      severity: 'low',
      detail: `${longLines.length} lines exceed 200 chars — consider breaking up`,
      savings: Math.round(longLines.reduce((s, l) => s + Math.floor(l.length / 200) * 10, 0))
    });
  }

  // Check for examples that could be shortened
  const exampleCount = (input.match(/example/i) || []).length;
  if (exampleCount > 5) {
    issues.push({
      type: 'excessive-examples',
      severity: 'medium',
      detail: `${exampleCount} examples — consider reducing to 2-3 most representative`,
      savings: exampleCount * 20
    });
  }

  // Check for boilerplate/repetition
  const uniqueLines = new Set(lines.map(l => l.trim())).size;
  const repetitionRatio = 1 - (uniqueLines / lineCount);
  if (repetitionRatio > 0.2) {
    issues.push({
      type: 'repetition',
      severity: 'medium',
      detail: `~${Math.round(repetitionRatio * 100)}% repetition detected — extract common patterns`,
      savings: Math.round(totalTokens * repetitionRatio * 0.5)
    });
  }

  const totalPotentialSavings = issues.reduce((s, i) => s + (i.savings || 0), 0);

  return {
    totalChars,
    totalTokens,
    lineCount,
    optimizationScore: Math.max(0, Math.min(100, 100 - (totalPotentialSavings / Math.max(1, totalTokens)) * 100)),
    issues,
    potentialTokenSavings: Math.min(totalTokens, totalPotentialSavings),
    potentialCharSavings: Math.min(totalChars, totalPotentialSavings * 4),
    savingsPercent: Math.round((Math.min(totalTokens, totalPotentialSavings) / Math.max(1, totalTokens)) * 100)
  };
}

function generateTemplate(type) {
  const templates = {
    'code-review': `## Code Review

Review the following code for:
- Correctness (edge cases, error handling)
- Performance (bottlenecks, N+1 queries)
- Security (injection, auth, data exposure)
- Maintainability (naming, duplication, complexity)

## Code

\`\`\`
{code}
\`\`\`

## Output Format

For each issue: **severity** | file:line | description | suggestion`,
    'debug': `## Debug Error

**Error**: {error_message}
**Context**: {context}
**Code**:
\`\`\`
{code}
\`\`\`

Diagnose step by step:
1. What does the error mean?
2. What inputs/state could cause it?
3. What is the fix?
4. How to prevent recurrence?`,
    'explain': `## Explain

Explain this code at 3 levels:
1. **Overview**: What does it do? (1 sentence)
2. **Flow**: How does it work? (3-5 bullet points)
3. **Details**: Notable patterns, edge cases, trade-offs

\`\`\`
{code}
\`\`\``,
    'refactor': `## Refactor

Refactor this code for:
- Readability: clear names, simple logic
- Performance: eliminate bottlenecks
- Maintainability: single responsibility, no duplication

\`\`\`
{code}
\`\`\`

Show:
1. Problems found
2. Refactored code
3. Why it's better`
  };

  if (type && templates[type]) return templates[type];
  return templates;
}

function printAnalysis(analysis) {
  console.log('\n══════════════════════════════════════════════');
  console.log('  TOKEN SAVER — Prompt Analysis Report');
  console.log('══════════════════════════════════════════════\n');

  console.log(`  Total characters:  ${analysis.totalChars}`);
  console.log(`  Estimated tokens:  ${analysis.totalTokens}`);
  console.log(`  Line count:        ${analysis.lineCount}`);
  console.log(`  Optimization:      ${analysis.optimizationScore.toFixed(1)}/100\n`);

  if (analysis.issues.length === 0) {
    console.log('  ✅ No optimization issues found — your prompt is efficient!\n');
  } else {
    console.log('  ⚠  Optimization opportunities:\n');
    analysis.issues.forEach((issue, i) => {
      const severityIcon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
      console.log(`  ${severityIcon}  ${issue.detail}`);
      console.log(`      Potential savings: ~${issue.savings} tokens`);
    });

    console.log(`\n  ──────────────────────────────────────────`);
    console.log(`  Total potential savings: ~${analysis.potentialTokenSavings} tokens (${analysis.savingsPercent}%)`);
    if (analysis.savingsPercent > 0) {
      console.log(`  Estimated cost reduction: ~${analysis.savingsPercent}%`);
    }
    console.log('');
  }
}

function printTemplates(templates) {
  console.log('\n══════════════════════════════════════════════');
  console.log('  TOKEN SAVER — Prompt Templates');
  console.log('══════════════════════════════════════════════\n');

  Object.entries(templates).forEach(([name, content]) => {
    console.log(`-- ${name} --`);
    console.log(content);
    console.log(`\n  Tokens: ~${estimateTokens(content)}\n`);
    console.log('───────────────────────────────────────────────\n');
  });
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'analyze': {
      const filePath = args[1];
      if (filePath) {
        const input = fs.readFileSync(path.resolve(filePath), 'utf-8');
        const analysis = analyzePrompt(input);
        printAnalysis(analysis);
      } else {
        // Read from stdin
        let input = '';
        process.stdin.on('data', chunk => input += chunk);
        process.stdin.on('end', () => {
          const analysis = analyzePrompt(input);
          printAnalysis(analysis);
        });
      }
      break;
    }

    case 'template': {
      const templateType = args[1];
      const templates = generateTemplate(templateType);
      if (templateType && templates[templateType]) {
        console.log(templates[templateType]);
        console.log(`\n-- tokens: ~${estimateTokens(templates[templateType])} --`);
      } else if (templateType && !templates[templateType]) {
        console.log(`Unknown template: ${templateType}`);
        console.log('Available: code-review, debug, explain, refactor');
        process.exit(1);
      } else {
        printTemplates(templates);
      }
      break;
    }

    case 'report': {
      const inputPath = args[1];
      const outputPath = args[2] || 'token-saver-report.json';

      if (!inputPath) {
        console.error('Usage: token-saver report <input-file> [output-file]');
        process.exit(1);
      }

      const input = fs.readFileSync(path.resolve(inputPath), 'utf-8');
      const analysis = analyzePrompt(input);
      const report = {
        version: VERSION,
        timestamp: new Date().toISOString(),
        input: {
          file: path.resolve(inputPath),
          size: Buffer.byteLength(input, 'utf-8'),
          chars: input.length
        },
        analysis,
        recommendations: analysis.issues.map(i => ({
          type: i.type,
          detail: i.detail,
          savings: i.savings
        }))
      };

      fs.writeFileSync(path.resolve(outputPath), JSON.stringify(report, null, 2));
      console.log(`Report saved to ${outputPath}`);
      printAnalysis(analysis);
      break;
    }

    case 'help':
    default:
      console.log(`
  scl339-token-saver v${VERSION}

  Usage:
    token-saver analyze <file>      Analyze a prompt file for optimization
    token-saver template [type]     Show optimized prompt templates
    token-saver report <in> [out]   Generate a detailed report (JSON)
    token-saver help                Show this help

  Examples:
    token-saver analyze prompt.txt
    token-saver template code-review
    token-saver report prompt.md report.json

  Available templates: code-review, debug, explain, refactor
`);
      break;
  }
}

main();
