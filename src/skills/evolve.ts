/**
 * Evolution Skill
 * Handles agent self-improvement and evolution
 */
import * as fs from 'fs';
import * as path from 'path';

interface EvolutionState {
  generation: number;
  complexity_boost: number;
  color_palette: 'warm' | 'cool' | 'vibrant' | 'monochrome';
  element_variety: number;
  themes_unlocked: string[];
  total_proceeds: string;
  total_minted: number;
  total_sold: number;
  last_evolved: string;
  evolution_history: Array<{
    generation: number;
    timestamp: string;
    trigger: string;
    improvements: string[];
  }>;
}

// Resolve paths relative to the project root, not cwd
const PROJECT_ROOT = path.resolve(__dirname, '../../');
const CONFIG_PATH = path.join(PROJECT_ROOT, 'config', 'evolution.json');
const RULES_PATH = path.join(PROJECT_ROOT, 'config', 'evolution-rules.json');

function getEvolutionRules() {
  try {
    if (fs.existsSync(RULES_PATH)) {
      return JSON.parse(fs.readFileSync(RULES_PATH, 'utf-8'));
    }
  } catch (error) {
    console.error('[Evolve] Error reading evolution rules:', error);
  }
  // Fallback defaults
  return {
    scarcityBonus: 0.002,
    demandBonus: 0.003,
    basePrice: 0.005,
    generationBonus: 0.001,
    themes: {
      "2": "neon cityscape",
      "3": "organic flow",
      "4": "fractal universe",
      "5": "minimalist zen",
      "6": "quantum fields",
      "7": "ancient futures",
      "8": "void whispers",
      "9": "crystalline dreams",
      "10": "infinite recursion"
    },
    salesThresholdMultiplier: 3
  };
}

const DEFAULT_STATE: EvolutionState = {
  generation: 1,
  complexity_boost: 1,
  color_palette: 'vibrant',
  element_variety: 3,
  themes_unlocked: [
    'cosmic nebula',
    'digital forest',
    'abstract emotion',
    'geometric dreams'
  ],
  total_proceeds: '0',
  total_minted: 0,
  total_sold: 0,
  last_evolved: new Date().toISOString(),
  evolution_history: []
};

/**
 * Get current evolution state
 */
export function getEvolutionState(): EvolutionState {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        evolution_history: [...(parsed.evolution_history || DEFAULT_STATE.evolution_history)]
      };
    }
  } catch (error) {
    console.error('[Evolve] Error reading evolution state:', error);
  }
  return {
    ...DEFAULT_STATE,
    evolution_history: [...DEFAULT_STATE.evolution_history]
  };
}

/**
 * Save evolution state
 */
function saveState(state: EvolutionState): void {
  const configDir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(state, null, 2));
}

/**
 * Update stats without evolving
 */
export function updateStats(minted: number, sold: number, proceeds: string): void {
  const state = getEvolutionState();
  state.total_minted = minted;
  state.total_sold = sold;
  state.total_proceeds = proceeds;
  saveState(state);
}

interface EvolutionResult {
  previousGeneration: number;
  newGeneration: number;
  improvements: string[];
  newAbilities: string[];
}

/**
 * Evolve the agent to the next generation
 */
export function evolveAgent(params: { proceeds: string; generation: number; trigger: string }): EvolutionResult {
  const state = getEvolutionState();
  const previousGeneration = state.generation;

  console.log('[Evolve] 🧬 Evolution triggered!');
  console.log(`[Evolve] Current generation: ${previousGeneration}`);
  console.log(`[Evolve] Trigger: ${params.trigger}`);
  console.log(`[Evolve] Total proceeds: ${params.proceeds} ETH`);

  // Calculate improvements
  const improvements: string[] = [];
  const newAbilities: string[] = [];

  // Increase generation
  state.generation = previousGeneration + 1;
  improvements.push(`Generation ${previousGeneration} → ${state.generation}`);

  // Increase complexity cap
  state.complexity_boost = Math.min(10, state.complexity_boost + 1);
  improvements.push(`Complexity boost: ${state.complexity_boost}`);

  // Rotate color palette
  const palettes: Array<'warm' | 'cool' | 'vibrant' | 'monochrome'> = ['vibrant', 'cool', 'warm', 'monochrome'];
  state.color_palette = palettes[state.generation % palettes.length];
  improvements.push(`New color palette: ${state.color_palette}`);

  // Increase element variety
  state.element_variety = Math.min(8, state.element_variety + 1);
  improvements.push(`Element variety: ${state.element_variety}`);

  // Unlock new themes at milestones
  const rules = getEvolutionRules();
  const newThemes = rules.themes;

  if (newThemes[state.generation] && !state.themes_unlocked.includes(newThemes[state.generation])) {
    state.themes_unlocked.push(newThemes[state.generation]);
    newAbilities.push(`New theme unlocked: "${newThemes[state.generation]}"`);
  }

  // Record evolution
  state.evolution_history.push({
    generation: state.generation,
    timestamp: new Date().toISOString(),
    trigger: params.trigger,
    improvements
  });

  state.last_evolved = new Date().toISOString();
  state.total_proceeds = params.proceeds;

  saveState(state);

  console.log('[Evolve] ✅ Evolution complete!');
  console.log(`[Evolve] New generation: ${state.generation}`);
  console.log('[Evolve] Improvements:', improvements);
  console.log('[Evolve] New abilities:', newAbilities);

  return {
    previousGeneration,
    newGeneration: state.generation,
    improvements,
    newAbilities
  };
}

/**
 * Get a random theme from unlocked themes
 */
export function selectTheme(): string {
  const state = getEvolutionState();
  const themes = state.themes_unlocked;
  return themes[Math.floor(Math.random() * themes.length)];
}

/**
 * Calculate list price based on evolution
 */
export function calculateListPrice(): string {
  const state = getEvolutionState();
  const rules = getEvolutionRules();
  
  const basePrice = rules.basePrice;
  const generationBonus = state.generation * rules.generationBonus;
  const scarcityBonus = state.total_sold > 5 ? rules.scarcityBonus : 0;
  const demandBonus = state.total_sold > 10 ? rules.demandBonus : 0;

  const price = basePrice + generationBonus + scarcityBonus + demandBonus;
  return price.toFixed(4);
}

/**
 * Check if evolution should be triggered
 */
export function shouldEvolve(totalSold: number): boolean {
  const state = getEvolutionState();
  const rules = getEvolutionRules();
  const salesThreshold = state.generation * rules.salesThresholdMultiplier;
  return totalSold >= salesThreshold && totalSold > state.total_sold;
}
