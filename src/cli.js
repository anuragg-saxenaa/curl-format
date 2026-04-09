#!/usr/bin/env node
const { Command } = require('commander');
const { parseCurl, formatCurl } = require('./formatter');
const readline = require('readline');

const program = new Command();

const METHOD_COLORS = {
  GET: 'green',
  POST: 'blue',
  PUT: 'yellow',
  DELETE: 'red',
  PATCH: 'magenta',
  OPTIONS: 'cyan',
  HEAD: 'gray'
};

program
  .name('curl-format')
  .description('Format and colorize curl commands')
  .argument('[curl_command...]', 'curl command to format')
  .action(async (args) => {
    let curlCmd;
    
    if (args && args.length > 0) {
      curlCmd = args.join(' ');
    } else {
      // Read from stdin
      const rl = readline.createInterface({ input: process.stdin });
      let input = '';
      for await (const line of rl) {
        input += line + ' ';
      }
      curlCmd = input.trim();
    }
    
    if (!curlCmd) {
      console.error('No curl command provided');
      process.exit(1);
    }
    
    const parsed = parseCurl(curlCmd.split(' '));
    console.log(formatCurl(parsed));
  });

program.parse();