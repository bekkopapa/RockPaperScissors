const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Rock Paper Scissors game', () => {
  let dom;
  let document;
  let play;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    dom.window.HTMLMediaElement.prototype.play = jest.fn();
    play = dom.window.play;
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('play updates win/lose/draw counts and win rate', () => {
    play('rock');
    expect(document.getElementById('win-count').textContent).toBe('0');
    expect(document.getElementById('lose-count').textContent).toBe('0');
    expect(document.getElementById('draw-count').textContent).toBe('1');
    expect(document.getElementById('win-rate').textContent).toBe('0.00%');

    play('paper');
    expect(document.getElementById('win-count').textContent).toBe('1');
    expect(document.getElementById('lose-count').textContent).toBe('0');
    expect(document.getElementById('draw-count').textContent).toBe('1');
    expect(document.getElementById('win-rate').textContent).toBe('50.00%');

    play('scissors');
    expect(document.getElementById('win-count').textContent).toBe('1');
    expect(document.getElementById('lose-count').textContent).toBe('1');
    expect(document.getElementById('draw-count').textContent).toBe('1');
    expect(document.getElementById('win-rate').textContent).toBe('33.33%');
  });
});
