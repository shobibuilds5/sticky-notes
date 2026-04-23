const https = require('https');

exports.handler = async (event) => {
  const { method, path, body } = JSON.parse(event.body);
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.notion.com',
      path,
      method,
      headers: {
        'Authorization': 'Bearer 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',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: data
      }));
    });
    req.on('error', (e) => resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};
