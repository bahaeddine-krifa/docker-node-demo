const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../server');

test('GET / returns the expected response', async (t) => {
  const server = createServer();

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  t.after(() => new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  }));

  const address = server.address();
  const response = await fetch(
    `http://127.0.0.1:${address.port}/`
  );

  assert.equal(response.status, 200);

  assert.equal(
    await response.text(),
    'This is the wrong message'
  );

  assert.match(
    response.headers.get('content-type'),
    /text\/plain/
  );
});