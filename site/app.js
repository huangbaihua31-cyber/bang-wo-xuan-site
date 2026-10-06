// This small website demo stays separate from the App's local lists and history.
const pools = {
  food: [['🍜', '牛肉面'], ['🍲', '火锅'], ['🍔', '汉堡'], ['🍢', '烧烤'], ['🥗', '轻食'], ['🍛', '咖喱饭'], ['🥟', '饺子'], ['🍣', '寿司']],
  drink: [['☕', '拿铁'], ['🧋', '奶茶'], ['🍵', '抹茶'], ['🍋', '柠檬茶'], ['🥛', '热牛奶'], ['🧃', '鲜榨果汁']],
};
const byId = id => document.getElementById(id);
let category = 'food';
let last = '';
let shuffling = false;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function randomItem(items) {
  if (!items.length) return null;
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / items.length) * items.length;
  do { crypto.getRandomValues(random); } while (random[0] >= limit);
  return items[random[0] % items.length];
}
function showAnswer(answer) {
  byId('result-emoji').textContent = answer[0];
  byId('result-name').textContent = answer[1];
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
byId('decide').addEventListener('click', async () => {
  if (shuffling) return;
  const remaining = pools[category].filter(item => item[1] !== last);
  const answer = randomItem(remaining);
  if (!answer) return;
  shuffling = true;
  byId('decide').disabled = true;
  document.querySelectorAll('.theme').forEach(button => { button.disabled = true; });
  byId('demo-result').hidden = false;
  byId('demo-title').hidden = true;
  byId('demo-hint').hidden = true;
  byId('decide-label').textContent = '正在帮你选…';
  document.querySelector('.phone').classList.add('shuffling');
  byId('demo-result').setAttribute('aria-live', 'off');
  if (!reducedMotion.matches) {
    for (let i = 0; i < 8; i++) { showAnswer(pools[category][i % pools[category].length]); await pause(95); }
  }
  byId('demo-result').setAttribute('aria-live', 'polite');
  showAnswer(answer);
  last = answer[1];
  byId('decide-label').textContent = '再来一次';
  document.querySelector('.phone').classList.remove('shuffling');
  byId('decide').disabled = false;
  document.querySelectorAll('.theme').forEach(button => { button.disabled = false; });
  shuffling = false;
});
document.querySelectorAll('.theme').forEach(button => button.addEventListener('click', () => {
  if (shuffling) return;
  category = button.dataset.category;
  last = '';
  document.querySelectorAll('.theme').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  byId('demo-title').textContent = category === 'food' ? '不知道吃什么？' : '不知道喝什么？';
  byId('demo-title').hidden = false;
  byId('demo-hint').hidden = false;
  byId('demo-result').hidden = true;
  byId('decide-label').textContent = '帮我决定';
}));


