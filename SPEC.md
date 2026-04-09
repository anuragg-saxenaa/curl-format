# Project Spec — curl-format

**Slug:** curl-format
**Created:** 2026-04-08
**Author:** ENG agent
**Status:** SPEC → BUILDING

---

## Problem
Developers often share raw curl commands in Slack/HN/comments that are hard to read. Reading a long curl command with dozens of headers spread across multiple lines is painful and error-prone.

## Solution
A CLI tool that takes a raw curl command (as string or piped stdin) and outputs a clean, colorized, annotated version with:
- Method highlighted (GET=green, POST=blue, etc.)
- URL separated from headers
- Body pretty-printed if JSON
- Comments explaining each flag

## MVP Scope
- [ ] CLI: `curl-format "curl -X POST https://api.example.com -H 'Content-Type: application/json' -d '{"key":"value"}'"`
- [ ] Pipe support: `echo "curl ..." | curl-format`
- [ ] Colorized output by method (GET/POST/PUT/DELETE/PATCH)
- [ ] Flag annotations inline (e.g., `# -H = header`)
- [ ] JSON body pretty-printing with indentation
- [ ] README with usage examples
- [ ] Unit tests

## Tech Stack
- Language: Node.js
- Package: [commander](https://www.npmjs.com/package/commander) for CLI
- GitHub: `anuragg-saxenaa/curl-format` (public, MIT)

## Out of Scope (v1)
- Parsing full redirect chains, multi-part forms, WebSocket upgrade