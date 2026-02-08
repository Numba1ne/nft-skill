# NFT Skill - Autonomous AI Artist Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Base Network](https://img.shields.io/badge/Base-L2-blue)](https://base.org)

An autonomous AI agent framework designed to generate, evolve, mint, list, and promote unique digital art on the Base blockchain. This project implements a self-contained "skill" module ready for integration with agent runtimes like OpenClaw.

## 🌟 Features

-   **🎨 Procedural Art Generation**: 
    -   Utilizes Simplex noise and pureimage for deterministic, high-quality canvas manipulation.
    -   Integrates with LLMs (OpenRouter, Groq, Ollama) to generate creative concepts and prompts.
    -   Supports multiple layers, blending modes, and color palettes.

-   **🧬 Evolutionary Logic**: 
    -   Self-improving algorithm that adapts art style based on sales performance.
    -   Tracks generations, sales history, and evolving preferences (e.g., color complexity, geometric density).
    -   Configurable evolution rules via JSON.

-   **🔗 Blockchain Integration**: 
    -   **Minting**: Full ERC721 minting support on Base network with gas estimation and retry logic.
    -   **Listing**: Automatic marketplace listing upon minting.
    -   **Monitoring**: Real-time event listeners for sales to trigger evolution.

-   **🐦 Social Autonomy**: 
    -   Automatically tweets new listings, sales, and evolution milestones via X (Twitter) API.
    -   Generates engaging, context-aware social media content.

-   **Modular Skill Architecture**: 
    -   Designed as a collection of focused TypeScript modules (`generateArt`, `evolve`, `mintNFT`, `social`, etc.).
    -   Easy to extend and integrate into larger agent systems.

## 🚀 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Numba1ne/nft-skill.git
    cd nft-skill
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```

## 🛠 Configuration

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
| :--- | :--- |
| `BASE_RPC_URL` | Base network RPC URL (e.g. `https://mainnet.base.org`) |
| `BASE_PRIVATE_KEY` | Wallet private key for signing transactions |
| `NFT_CONTRACT_ADDRESS` | Your ERC721 contract address |
| `MARKETPLACE_ADDRESS` | Marketplace contract address |
| `PINATA_API_KEY` | Pinata API key for IPFS uploads |
| `PINATA_SECRET` | Pinata secret key |
| `LLM_PROVIDER` | `openrouter`, `groq`, or `ollama` |
| `OPENROUTER_API_KEY` | OpenRouter API key (if using openrouter) |
| `X_CONSUMER_KEY` | X (Twitter) API credentials |
| `X_CONSUMER_SECRET` | |
| `X_ACCESS_TOKEN` | |
| `X_ACCESS_SECRET` | |

## 📟 CLI Usage

```bash
# Generate new art and upload to IPFS
npm run cli -- generate --generation 1 --theme "neon cyberpunk city"

# Trigger agent evolution
npm run cli -- evolve --proceeds "0.5" --generation 1 --trigger "Sold 10 items"

# Post a tweet
npm run cli -- tweet --content "New art drop incoming! #AIArt"
```

## 🧪 Testing

Run the comprehensive test suite to verify all skills:

```bash
npm test
```

## 🏗 Architecture

The project is organized into modular skills within `src/skills/`:

| Skill Module | Description |
| :--- | :--- |
| `generateArt.ts` | Core engine for procedural art generation and IPFS upload. |
| `evolve.ts` | Manages evolutionary state, rules, and parameter adaptation. |
| `mintNFT.ts` | Handles blockchain transactions for minting NFTs. |
| `listNFT.ts` | Interacts with the marketplace smart contract to list items. |
| `social.ts` | Manages X (Twitter) interactions and announcements. |
| `monitorSales.ts` | Listens for on-chain sales events to trigger feedback loops. |
| `llm.ts` | Abstraction layer for LLM API interactions. |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
