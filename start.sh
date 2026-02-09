#!/usr/bin/env bash
# start.sh - convenience wrapper to run nft-skill CLI as a long-running service
set -e
cd "$(dirname "$0")"
# Default behavior: start marketplace monitor
npx ts-node src/cli.ts monitor
