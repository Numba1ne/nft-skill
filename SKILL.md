---
name: nft-skill
description: Autonomous AI Artist Agent skill for generating, evolving, and promoting NFT art on Base.
metadata:
  version: 1.0.0
  author: AI Artist
  license: MIT
  requires:
    bins: [node, npm]
    env: [BASE_RPC_URL, BASE_PRIVATE_KEY, PINATA_API_KEY, PINATA_SECRET, LLM_PROVIDER]
---

# NFT Skill for OpenClaw

This skill allows an OpenClaw agent to autonomously generate art, evolve based on sales, and manage social interactions for an NFT project.

## Installation

Ensure dependencies are installed:
```bash
npm install
npm run build
```

## Tools

### 1. Generate Art
Generate new procedural art based on a theme and generation level.

```bash
npm run cli -- generate --generation <number> --theme "<theme_description>"
```
Example:
```bash
npm run cli -- generate --generation 1 --theme "neon cyberpunk city"
```

### 2. Evolve Agent
Trigger the evolution logic when sales milestones are met.

```bash
npm run cli -- evolve --proceeds <amount_eth> --generation <current_gen> --trigger "<reason>"
```
Example:
```bash
npm run cli -- evolve --proceeds "0.5" --generation 1 --trigger "Sold 10 items"
```

### 3. Post Tweet
Post an update to X (Twitter).

```bash
npm run cli -- tweet --content "<tweet_text>"
```
Example:
```bash
npm run cli -- tweet --content "New art drop incoming! #AIArt"
```

## Output Format
All tools output JSON logs. Look for the final line containing `{"status": "success", ...}` or `{"status": "error", ...}`.
