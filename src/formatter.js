const chalk = require('chalk');

const METHOD_COLORS = {
  GET: 'green',
  POST: 'blue',
  PUT: 'yellow',
  DELETE: 'red',
  PATCH: 'magenta',
  OPTIONS: 'cyan',
  HEAD: 'gray'
};

const FLAG_DESCRIPTIONS = {
  '-X': 'HTTP method',
  '-H': 'header',
  '-d': 'data (body)',
  '--data': 'data (body)',
  '--data-raw': 'data (body)',
  '-A': 'user-agent',
  '-u': 'basic auth',
  '-b': 'cookies',
  '-c': 'cookies',
  '-e': 'referer',
  '-I': 'headers only',
  '-k': 'insecure (skip SSL)',
  '-L': 'follow redirects',
  '-s': 'silent',
  '-v': 'verbose',
  '--compressed': 'accept compressed'
};

function parseCurl(args) {
  const result = {
    method: 'GET',
    url: '',
    headers: [],
    body: null,
    flags: []
  };
  
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    
    if (arg === 'curl') {
      i++;
      continue;
    }
    
    if (arg.startsWith('-')) {
      if (arg === '-X' || arg === '--request') {
        result.method = args[++i].toUpperCase();
      } else if (arg === '-H' || arg === '--header') {
        result.headers.push(args[++i]);
      } else if (arg === '-d' || arg === '--data' || arg === '--data-raw') {
        result.body = args[++i];
      } else if (FLAG_DESCRIPTIONS[arg]) {
        const next = args[i + 1];
        result.flags.push({ flag: arg, value: (next && !next.startsWith('-')) ? args[++i] : null });
      }
    } else if (!arg.startsWith('http') && !arg.startsWith('-')) {
      // Skip unknown args
    } else {
      result.url = arg;
    }
    i++;
  }
  
  return result;
}

function formatCurl(curlObj) {
  const method = curlObj.method || 'GET';
  const color = METHOD_COLORS[method] || 'white';
  const lines = [];
  
  // Method
  lines.push(chalk[color](method) + ' ' + curlObj.url);
  
  // Headers with annotations
  for (const header of curlObj.headers) {
    lines.push(chalk.gray(`# -H = header`) + ' ' + header);
  }
  
  // Body
  if (curlObj.body) {
    let body = curlObj.body;
    try {
      const parsed = JSON.parse(body);
      body = JSON.stringify(parsed, null, 2);
    } catch {}
    lines.push(chalk.gray('# -d = body') + '\n' + body);
  }
  
  // Other flags
  for (const f of curlObj.flags) {
    if (f.value) {
      lines.push(chalk.gray(`# ${f.flag}`) + ' ' + f.value);
    } else if (FLAG_DESCRIPTIONS[f.flag]) {
      lines.push(chalk.gray(`# ${f.flag} = ${FLAG_DESCRIPTIONS[f.flag]}`));
    }
  }
  
  return lines.join('\n');
}

module.exports = { parseCurl, formatCurl };