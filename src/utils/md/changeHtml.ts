import hljs from 'highlight.js';
import Renderer from 'markdown-it/lib/renderer';
import { trancateValue } from '../createValue';
import MarkdownIt, { Token } from 'markdown-it';

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

  // リンクカード
  if (ogpDatas) {
    // md.renderer.rules.link_open = (
    //   tokens: Token[],
    //   idx: number,
    //   options: {},
    //   env: {},
    //   self: any,
    // ) => {
    //   const token = tokens[idx];
    //   const hrefAttrIndex = token.attrIndex('href'); // href属性のindexを取得
    //   if (hrefAttrIndex !== -1) {
    //     ogpDatas.forEach((ogp: any) => {
    //       const { ogTitle, ogDescription, ogImage } = ogp;
    //       console.log('OGPデータ', ogp);
    //       const linkCardHtml = `<div class="md-link_card"><a href="${'/'}" target="_blank" rel="noopener noreferrer"><h2>${ogTitle}</h2>${ogDescription && `<p>${ogDescription}</p>`}${ogImage && `<img src="${ogImage[0].url}" alt="${ogTitle}" />`}</a></div>`;
    //       console.log('リンクカード', linkCardHtml);
    //       return linkCardHtml;
    //     });
    //     // }
    //   }
    // };
    // md.renderer.rules.link_open = (
    //   tokens: Token[],
    //   idx: number,
    //   options: {},
    //   env: {},
    //   self: any,
    // ) => {
    //   console.log('セルフ？？', self);
    //   const token = tokens[idx];
    //   const hrefAttrIndex = token.attrIndex('href');
    //   if (hrefAttrIndex !== -1) {
    //     ogpDatas.forEach((ogp: any) => {
    //       const { ogTitle, ogDescription, ogImage } = ogp;
    //       console.log('OGPデータ', ogp);
    //       const linkCardHtml = `<div class="md-link_card"><a href="${'/'}" target="_blank" rel="noopener noreferrer"><h2>${ogTitle}</h2>${ogDescription && `<p>${ogDescription}</p>`}${ogImage && `<img src="${ogImage[0].url}" alt="${ogTitle}" />`}</a></div>`;
    //       console.log('リンクカード', linkCardHtml);
    //       tokens[idx + 1].content = linkCardHtml + tokens[idx + 1].content; // リンクの後にHTMLを挿入
    //     });
    //   }
    //   return self.renderToken(tokens, idx, options);
    // };
  }

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
