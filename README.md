NFT Skill — Quickstart

This repo provides a CLI-driven autonomous NFT artist agent (generate → upload → mint → list → monitor → tweet).

Quick setup
1. Copy .env.example to .env and fill in the required secrets and endpoints.
   cp .env.example .env
2. Install dependencies and build:
   npm install
   npm run build

Key commands (run from repo root)
- Generate art and upload to IPFS:
  npx ts-node src/cli.ts generate -g 1 -t "pixelated trend on the base ecosystem"

- Mint a token with metadata CID (pass raw CID or ipfs:// URI):
  npx ts-node src/cli.ts mint -m QmYourMetadataCID

- List a token on the bundled marketplace:
  npx ts-node src/cli.ts list -i 0 -p 0.01

- Monitor marketplace sales (streams JSON events until stopped):
  npx ts-node src/cli.ts monitor

Notes & best practices
- Use a provider-backed RPC for reliability (Alchemy/Infura/QuickNode). Put the full URL in BASE_RPC_URL.
- Keep secrets out of chat. Use .env or the VM skill config; rotate keys if exposed.
- For automated runs, add a workflow or a cron job to run generate→mint→list.

Docker (basic)
- See Dockerfile in this repo. Build & run as:
  docker build -t nft-skill .
  docker run --env-file .env nft-skill

Want help: I can create a Lobster workflow to automate the full pipeline, add CI, or publish this skill to ClawHub.
