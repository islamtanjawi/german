// Static content validation only; does not simulate the browser or grade interactive sessions.
'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/exam.js', 'utf8');
const start = source.indexOf('const BANK=');
const end = source.indexOf('const ERROR_KEY=', start);
assert(start >= 0 && end > start, 'Exam bank markers not found');
const bank = vm.runInNewContext(source.slice(start, end) + '\n;BANK', Object.create(null), {timeout: 2000});
const levels = ['A1', 'A2', 'B1'];
assert.deepEqual(Object.keys(bank).sort(), [...levels].sort(), 'Unexpected exam levels');
for (const level of levels) {
  const questions = bank[level];
  assert(Array.isArray(questions) && questions.length >= 16, `${level}: missing questions`);
  const seen = new Set();
  const skills = {Lesen: 0, 'Hören': 0};
  for (const [index, q] of questions.entries()) {
    assert(Array.isArray(q) && q.length === 6, `${level} #${index + 1}: expected six fields`);
    const [skill, passage, question, options, correct, explanation] = q;
    assert(Object.hasOwn(skills, skill), `${level} #${index + 1}: invalid skill`);
    skills[skill]++;
    for (const [label, value] of [['passage', passage], ['question', question], ['explanation', explanation]]) {
      assert(typeof value === 'string' && value.trim(), `${level} #${index + 1}: empty ${label}`);
    }
    assert(Array.isArray(options) && options.length === 3, `${level} #${index + 1}: expected three options`);
    assert(options.every(o => typeof o === 'string' && o.trim()), `${level} #${index + 1}: empty option`);
    assert(new Set(options.map(o => o.trim().toLowerCase())).size === 3, `${level} #${index + 1}: repeated option`);
    assert(Number.isInteger(correct) && correct >= 0 && correct < 3, `${level} #${index + 1}: invalid answer index`);
    const key = (skill + '|' + passage + '|' + question).toLowerCase();
    assert(!seen.has(key), `${level} #${index + 1}: duplicate question`);
    seen.add(key);
  }
  assert(skills.Lesen > 0 && skills['Hören'] > 0, `${level}: missing a skill`);
  console.log(`${level}: ${questions.length} questions (Lesen ${skills.Lesen}, Hören ${skills['Hören']}) — structure valid`);
}
// Targeted semantic regression checks: verify answer keys for common time expressions.
const semanticCases = [
  ['A1', 'halb sieben', 'Um halb sieben'],
  ['A1', 'neun Uhr zehn', 'Um 9:10 Uhr'],
  ['A2', 'halb zwei Mittagspause', 'Um 13:30 Uhr'],
  ['A2', 'zehn Minuten früher', '15:50 Uhr'],
  ['B1', 'mindestens zwanzig Jugendliche', 'Wenn mindestens zwanzig Jugendliche regelmäßig teilnehmen'],
  ['B1', 'Für Auszubildende bleibt', 'Für Auszubildende mit ermäßigtem Monatsticket'],
];
for (const [level, phrase, expected] of semanticCases) {
  const matches = bank[level].filter(q => q[1].includes(phrase));
  assert.equal(matches.length, 1, `${level}: missing or ambiguous semantic test ${phrase}`);
  const q = matches[0];
  assert.equal(q[3][q[4]], expected, `${level}: wrong answer key for ${phrase}`);
}
console.log('Targeted answer-key regression checks passed (6 cases).');
console.log('Static exam bank validation passed. Browser interaction not tested.');
