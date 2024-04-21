import hljs from 'highlight.js';
import Renderer from 'markdown-it/lib/renderer';
import { trancateValue } from '../createValue';
import MarkdownIt, { Token } from 'markdown-it';
import StateInline from 'markdown-it/lib/rules_inline/state_inline';
import { RuleInline } from 'markdown-it/lib/parser_inline';
import { linkCard } from './linkCard';
import { fileName } from './fileName';

/**
 * マークダウンをhtmlに変換し、クラスをつけて返却する
 * @param markdown
 * @returns
 */
export function changeHtml(markdown: string, ogpDatas?: any) {
  const md: MarkdownIt = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: 'language-',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre><code class="hljs language-${lang}">` +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            '</code></pre>'
          );
        } catch (__) {}
      }

      return (
        `<pre><code class="hljs language-${lang}">` +
        md.utils.escapeHtml(str) +
        '</code></pre>'
      );
    },
  });

  md.linkify.set({ fuzzyLink: false });

  // hタグをそれぞれでクラスを追加
  const defaultRenderer = (md.renderer.rules.heading_open = (
    tokens: Token[],
    idx: number,
    options: {},
    env: {},
    self: Renderer,
  ) => {
    const token = tokens[idx];
    const level = token.tag;

    if (level === 'h1') {
      token.attrSet('class', 'md-container__h1');
    } else if (level === 'h2') {
      token.attrSet('class', 'md-container__h2');
    } else if (level === 'h3') {
      token.attrSet('class', 'md-container__h3');
    } else if (level === 'h4') {
      token.attrSet('class', 'md-container__h4');
    } else if (level === 'h5') {
      token.attrSet('class', 'md-container__h5');
    }

    return self.renderToken(tokens, idx, options);
  });

  md.renderer.rules.table_open = () => {
    return '<table class="md-container__table">';
  };

  md.renderer.rules.blockquote_open = () => {
    return '<blockquote class="md-container__blockquote">';
  };

  // リンクは別タブで開くルールを追加
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']);
    }

    // このトークンをデフォルトに渡す
    return defaultRenderer(tokens, idx, options, env, self);
  };

  // 自作プラグイン
  if (ogpDatas) {
    md.use(linkCard, ogpDatas);
  }

  md.use(fileName);

  const result = md.render(markdown);
  return result;
}

/**
 * 検索結果に表示されるマークダウンコンテンツをhtmlに変換
 * @param markdown
 * @returns
 */
export function simpleChangeHtml(markdown: string) {
  const cleanedMd = markdown.replace(/\\|n|\n|#|-|\|/g, ' ');
  const md = new MarkdownIt({
    html: true,
    breaks: false,
  });
  const html = trancateValue(cleanedMd, 70);
  return md.render('...' + html);
}
