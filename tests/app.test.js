const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Vehicle Rental System page exists and contains the project title', () => {
  const page = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert.match(page, /Vehicle Rental System/);
  assert.match(page, /Suzuki Swift/);
  assert.match(page, /Honda City/);
});
