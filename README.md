# curl-format

Format and colorize curl commands for readability.

## Install

```bash
npm install -g curl-format
```

## Usage

### CLI arguments

```bash
curl-format "curl -X POST https://api.example.com -H 'Content-Type: application/json' -d '{\"key\":\"value\"}'"
```

### Pipe support

```bash
echo "curl -X POST https://api.example.com -H 'Content-Type: application/json' -d '{\"key\":\"value\"}'" | curl-format
```

### Output Example

```
POST https://api.example.com
# -H = header Content-Type: application/json
# -d = body 
{
  "key": "value"
}
```

## Flags Supported

| Flag | Description |
|------|-------------|
| `-X` | HTTP method |
| `-H` | Header |
| `-d`, `--data` | Request body |
| `-A` | User-agent |
| `-u` | Basic auth |
| `-b`, `-c` | Cookies |
| `-e` | Referer |
| `-k` | Skip SSL verification |
| `-L` | Follow redirects |

## License

MIT