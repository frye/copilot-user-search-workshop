const groups = [
  {
    key: 'route', heading: 'Choose your route', label: 'Authoring route', defaultKey: 'import',
    options: [
      { heading: 'Build it yourself', label: 'Build it yourself', key: 'build' },
      { heading: 'Copy-and-paste', label: 'Copy & Paste', key: 'copy' },
      { heading: 'Bring in this step', label: 'Bring in this step', key: 'import' },
    ],
  },
  {
    key: 'client', heading: 'Client steps', label: 'Workshop client', defaultKey: 'vscode',
    options: [
      { heading: 'VS Code', label: 'VS Code', key: 'vscode' },
      { heading: 'Copilot CLI', label: 'Copilot CLI', key: 'cli' },
      { heading: 'Copilot app', label: 'Copilot app', key: 'app' },
    ],
  },
];
const controllers = new WeakMap();
const sessionChoices = new Map();

function headingText(node) {
  const copy = node.cloneNode(true);
  copy.querySelectorAll('.header-anchor').forEach(anchor => anchor.remove());
  return copy.textContent.trim();
}

function fragmentTarget(document, hash) {
  try {
    return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    return null;
  }
}

function enhanceGroup(root, document, window, config) {
  const existing = root.querySelector(`[data-${config.key}-tabs]`);
  if (existing) return controllers.get(existing);
  const heading = [...root.querySelectorAll('h2')].find(node => headingText(node) === config.heading);
  if (!heading) return;
  const nodes = [];
  for (let node = heading.nextElementSibling; node && node.tagName !== 'H2'; node = node.nextElementSibling) nodes.push(node);
  const starts = nodes.filter(node => node.tagName === 'H3');
  if (starts.length !== config.options.length ||
      starts.some((node, index) => headingText(node) !== config.options[index].heading)) return;

  const wrapper = document.createElement('div');
  wrapper.setAttribute(`data-${config.key}-tabs`, '1');
  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', config.label);
  wrapper.append(list);
  const notice = document.createElement('p');
  notice.className = 'tab-preference-notice';
  notice.setAttribute('role', 'status');
  notice.hidden = true;
  wrapper.append(notice);
  starts[0].before(wrapper);
  let current;
  const panels = [];
  for (const node of nodes.slice(nodes.indexOf(starts[0]))) {
    if (node.tagName === 'H3') {
      current = document.createElement('section');
      current.setAttribute('role', 'tabpanel');
      current.id = `${config.key}-panel-${config.options[panels.length].key}`;
      current.setAttribute('aria-labelledby', `${config.key}-tab-${config.options[panels.length].key}`);
      current.tabIndex = 0;
      panels.push(current);
      wrapper.append(current);
    }
    current.append(node);
  }
  const buttons = config.options.map((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.label;
    button.id = `${config.key}-tab-${option.key}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panels[index].id);
    list.append(button);
    return button;
  });

  const storageKey = `workshop-${config.key}`;
  const valid = key => config.options.some(option => option.key === key);
  const panelIndex = target => target ? panels.findIndex(panel => panel === target || panel.contains(target)) : -1;
  function storageDenied(error) {
    if (!['SecurityError', 'QuotaExceededError'].includes(error?.name)) throw error;
    notice.textContent = `${config.label} preferences cannot be saved in this browser. Your choice remains active for this page session.`;
    notice.hidden = false;
  }
  function savedChoice() {
    if (sessionChoices.has(config.key)) return sessionChoices.get(config.key);
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      storageDenied(error);
    }
  }
  function choose(key, focus = false, updateURL = true) {
    buttons.forEach((button, index) => {
      const active = config.options[index].key === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
      if (active && focus) button.focus();
    });
    try {
      window.localStorage.setItem(storageKey, key);
      sessionChoices.delete(config.key);
      notice.hidden = true;
    } catch (error) {
      storageDenied(error);
      sessionChoices.set(config.key, key);
    }
    if (updateURL) {
      const url = new URL(window.location.href);
      url.searchParams.set(config.key, key);
      if (panelIndex(fragmentTarget(document, url.hash)) !== -1) {
        url.hash = starts[config.options.findIndex(option => option.key === key)].id;
      }
      window.history.replaceState(window.history.state, '', url);
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => choose(config.options[index].key));
    button.addEventListener('keydown', event => {
      const count = config.options.length;
      const next = event.key === 'ArrowRight' ? (index + 1) % count :
        event.key === 'ArrowLeft' ? (index + count - 1) % count :
        event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;
      if (next !== null) {
        event.preventDefault();
        choose(config.options[next].key, true);
      }
    });
  });

  const controller = {
    key: config.key,
    contains: target => panelIndex(target) !== -1,
    sync(url) {
      const anchored = panelIndex(fragmentTarget(document, url.hash));
      const query = url.searchParams.get(config.key);
      const preferred = anchored !== -1 ? config.options[anchored].key : valid(query) ? query : savedChoice();
      choose(valid(preferred) ? preferred : config.defaultKey, false, false);
      return anchored !== -1 ? preferred : null;
    },
  };
  controllers.set(wrapper, controller);
  return controller;
}

export function enhanceTabs(document, window) {
  const root = document.querySelector('.vp-doc');
  if (!root) return () => {};
  const active = groups.map(config => enhanceGroup(root, document, window, config)).filter(Boolean);
  if (!active.length) return () => {};
  function sync() {
    const url = new URL(window.location.href);
    active.forEach(controller => {
      const anchoredChoice = controller.sync(url);
      if (anchoredChoice) url.searchParams.set(controller.key, anchoredChoice);
    });
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
    const target = fragmentTarget(document, url.hash);
    if (active.some(controller => controller.contains(target))) target.scrollIntoView();
  }
  function followLink(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        !(event.target instanceof window.Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
    // Reveal hidden destinations before the router or browser scrolls to the anchor.
    active.forEach(controller => controller.sync(url));
  }
  sync();
  root.addEventListener('click', followLink, true);
  window.addEventListener('hashchange', sync);
  window.addEventListener('popstate', sync);
  return () => {
    root.removeEventListener('click', followLink, true);
    window.removeEventListener('hashchange', sync);
    window.removeEventListener('popstate', sync);
  };
}
