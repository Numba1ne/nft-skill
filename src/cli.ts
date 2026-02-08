import * as dotenv from 'dotenv';
dotenv.config();

import { Command } from 'commander';
import { createAndUploadArt } from './skills/generateArt';
import { evolveAgent } from './skills/evolve';
import { postToX } from './skills/social';

const program = new Command();

program
  .name('nft-skill')
  .description('Autonomous AI Artist Agent CLI for OpenClaw')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate new art and upload to IPFS')
  .requiredOption('-g, --generation <number>', 'Generation number', parseInt)
  .requiredOption('-t, --theme <string>', 'Art theme description')
  .action(async (options: any) => {
    try {
      console.log(JSON.stringify({ status: 'running', message: 'Generating art...' }));
      const result = await createAndUploadArt(options.generation, options.theme);
      console.log(JSON.stringify({ status: 'success', result }));
    } catch (error: any) {
      console.error(JSON.stringify({ status: 'error', message: error.message }));
      process.exit(1);
    }
  });

program
  .command('evolve')
  .description('Trigger agent evolution')
  .requiredOption('-p, --proceeds <string>', 'Total sales proceeds in ETH')
  .requiredOption('-g, --generation <number>', 'Current generation', parseInt)
  .requiredOption('-tr, --trigger <string>', 'Reason for evolution')
  .action(async (options: any) => {
    try {
      console.log(JSON.stringify({ status: 'running', message: 'Evolving agent...' }));
      const result = evolveAgent({
        proceeds: options.proceeds,
        generation: options.generation,
        trigger: options.trigger
      });
      console.log(JSON.stringify({ status: 'success', result }));
    } catch (error: any) {
      console.error(JSON.stringify({ status: 'error', message: error.message }));
      process.exit(1);
    }
  });

program
  .command('tweet')
  .description('Post a tweet')
  .requiredOption('-c, --content <string>', 'Tweet content')
  .action(async (options: any) => {
    try {
      console.log(JSON.stringify({ status: 'running', message: 'Posting tweet...' }));
      const result = await postToX(options.content);
      if (result) {
        console.log(JSON.stringify({ status: 'success', result }));
      } else {
        throw new Error('Failed to post tweet');
      }
    } catch (error: any) {
      console.error(JSON.stringify({ status: 'error', message: error.message }));
      process.exit(1);
    }
  });

program.parse(process.argv);
