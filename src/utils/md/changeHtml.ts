import markdownit, { Token } from 'markdown-it';
import hljs from 'highlight.js';
import Renderer from 'markdown-it/lib/renderer';

export function changeHtml(markdown: string) {
  const md: any = markdownit({
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

  // hタグをそれぞれでクラスを追加
  md.renderer.rules.heading_open = (
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
  };

  md.renderer.rules.table_open = () => {
    return '<table class="md-container__table">';
  };

  md.renderer.rules.blockquote_open = () => {
    return '<blockquote class="md-container__blockquote">';
  };

  // リンクを別タブ
  // const links = document.querySelectorAll('p a');
  // if (links) {
  //   links.forEach((link) => {
  //     link.setAttribute('target', '_blank');
  //     link.setAttribute('rel', 'noopener noreferrer');
  //   });
  // }

  return md.render(markdown);
}
