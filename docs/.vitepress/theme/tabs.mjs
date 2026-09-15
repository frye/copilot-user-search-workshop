const clients = [
  { label: 'VS Code', key: 'vscode' },
  { label: 'Copilot CLI', key: 'cli' },
  { label: 'Copilot app', key: 'app' },
];

export function enhanceTabs(document, window) {
  const root = document.querySelector('.vp-doc');
  if (!root || root.querySelector('[data-client-tabs]')) return;
  const text = node => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('.header-anchor').forEach(anchor => anchor.remove());
    return copy.textContent.trim();
  };
  const heading = [...root.querySelectorAll('h2')].find(node => text(node) === 'Client steps');
  if (!heading) return;
  const nodes = [];
  for (let node = heading.nextElementSibling; node && node.tagName !== 'H2'; node = node.nextElementSibling) nodes.push(node);
  const starts = nodes.filter(node => node.tagName === 'H3');
  if (starts.length !== 3 || starts.some((node, i) => text(node) !== clients[i].label)) return;
  let selected = new URL(window.location.href).searchParams.get('client');
  if (!clients.some(client => client.key === selected)) {
    try { selected = window.localStorage.getItem('workshop-client'); } catch { selected = null; }
  }
  if (!clients.some(client => client.key === selected)) selected = 'vscode';
  const wrapper = document.createElement('div');
  wrapper.dataset.clientTabs = '1';
  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', 'Workshop client');
  wrapper.append(list);
  heading.after(wrapper);
  let current;
  const panels = [];
  for (const node of nodes) {
    if (node.tagName === 'H3') {
      current = document.createElement('section');
      current.setAttribute('role', 'tabpanel');
      current.id = `client-panel-${clients[panels.length].key}`;
      current.setAttribute('aria-labelledby', `client-tab-${clients[panels.length].key}`);
      current.tabIndex = 0;
      panels.push(current);
      wrapper.append(current);
    }
    current.append(node);
  }
  const buttons = clients.map((client, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = client.label;
    button.id = `client-tab-${client.key}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panels[index].id);
    list.append(button);
    return button;
  });
  function choose(key, focus = false, updateURL = true) {
    selected = key;
    buttons.forEach((button, index) => {
      const active = clients[index].key === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
      if (active && focus) button.focus();
    });
    try { window.localStorage.setItem('workshop-client', key); } catch { /* Storage may be disabled. */ }
    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.set('client', key);
      const anchoredClient = panels.some(panel => [...panel.querySelectorAll('[id]')].some(node => node.id === url.hash.slice(1)));
      if (anchoredClient) url.hash = panels[clients.findIndex(client => client.key === key)].querySelector('h3').id;
      window.history.replaceState(window.history.state, '', url);
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => choose(clients[index].key));
    button.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % 3 :
        event.key === 'ArrowLeft' ? (index + 2) % 3 :
        event.key === 'Home' ? 0 : event.key === 'End' ? 2 : null;
      if (next !== null) { event.preventDefault(); choose(clients[next].key, true); }
    });
  });
  const hash = window.location.hash.slice(1);
  const targetPanel = panels.find(panel => [...panel.querySelectorAll('[id]')].some(node => node.id === hash));
  if (targetPanel) selected = clients[panels.indexOf(targetPanel)].key;
  choose(selected, false, false);
}
