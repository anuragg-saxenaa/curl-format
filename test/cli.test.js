const { parseCurl, formatCurl } = require('../src/formatter');

describe('parseCurl', () => {
  test('parses basic GET', () => {
    const result = parseCurl(['curl', 'https://example.com']);
    expect(result.method).toBe('GET');
    expect(result.url).toBe('https://example.com');
  });

  test('parses POST with method flag', () => {
    const result = parseCurl(['curl', '-X', 'POST', 'https://api.example.com']);
    expect(result.method).toBe('POST');
    expect(result.url).toBe('https://api.example.com');
  });

  test('parses headers', () => {
    const result = parseCurl(['curl', '-H', 'Content-Type: application/json', 'https://api.example.com']);
    expect(result.headers).toContain('Content-Type: application/json');
  });

  test('parses body data', () => {
    const result = parseCurl(['curl', '-d', '{"key":"value"}', 'https://api.example.com']);
    expect(result.body).toBe('{"key":"value"}');
  });

  test('defaults to GET when no -X', () => {
    const result = parseCurl(['curl', '-d', '{"key":"value"}', 'https://api.example.com']);
    expect(result.method).toBe('GET');
  });
});

describe('formatCurl', () => {
  test('includes method and URL', () => {
    const input = { method: 'GET', url: 'https://example.com', headers: [], body: null, flags: [] };
    const output = formatCurl(input);
    expect(output).toContain('GET');
    expect(output).toContain('https://example.com');
  });

  test('includes header annotation', () => {
    const input = { method: 'GET', url: 'https://example.com', headers: ['Content-Type: application/json'], body: null, flags: [] };
    const output = formatCurl(input);
    expect(output).toContain('# -H = header');
    expect(output).toContain('Content-Type: application/json');
  });
});