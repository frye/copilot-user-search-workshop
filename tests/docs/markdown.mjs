import { resolve } from 'node:path';
import { createMarkdownRenderer } from 'vitepress';

const markdown = await createMarkdownRenderer(resolve('docs'), {}, '/');

export const tokensFor = text => markdown.parse(text, {});

export function sectionsIn(text) {
  const tokens = tokensFor(text);
  const headings = tokens.flatMap((token, index) => token.type === 'heading_open'
    ? [{ name: tokens[index + 1].content, level: Number(token.tag.slice(1)), start: index }]
    : []);
  return headings.map((heading, index) => {
    const end = headings.slice(index + 1).find(next => next.level <= heading.level)?.start ?? tokens.length;
    return { ...heading, end, tokens: tokens.slice(heading.start, end) };
  });
}

export function linksIn(text) {
  return tokensFor(text).flatMap(token => (token.children ?? [])
    .filter(child => child.type === 'link_open')
    .map(child => child.attrGet('href')));
}

export function artifactsIn(text) {
  const tokens = tokensFor(text);
  return tokens.flatMap((token, index) => {
    if (token.type !== 'fence') return [];
    const label = tokens[index - 2];
    if (label?.type !== 'inline') return [];
    const match = label.content.match(/^\*\*File:\*\* `([^`]+)` \(([^)]+)\)\.?$/);
    if (!match) return [];
    const [action, ...qualifiers] = match[2].split(';').map(part => part.trim());
    return [{ path: match[1], action, qualifiers, content: token.content, language: token.info.trim() }];
  });
}
