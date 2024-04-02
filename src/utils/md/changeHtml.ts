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
      console.log('これは？', str, lang);
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

  // htmlにクラス属性を追加
  // h1
  // md.renderer.rules.heading_open = function () {
  //   return '<h1 class="md-container__heading">';
  // };
  // // h2
  // md.renderer.rules.heading2_open = function () {
  //   return '<h2 class="md-container__heading2">';
  // };

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
    return '<table class="md-container__h5">';
  };

  md.renderer.rules.blockquote_open = () => {
    return '<blockquote class="md-container__blockquote">';
  };

  // md.renderer.rules.paragraph_open = (
  //   tokens: Token[],
  //   idx: number,
  //   options: {},
  //   env: {},
  //   self: Renderer,
  // ) => {
  //   tokens[idx].attrs?.push(['class', 'p-tag']);
  // };

  return md.render(markdown);
}
