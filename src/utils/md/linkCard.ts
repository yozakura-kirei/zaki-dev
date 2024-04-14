import MarkdownIt from 'markdown-it';
import { OgpDataRes } from './getOgpData';
import { trancateValue } from '../createValue';

/**
 * 直書きリンクをリンクカードに変換する
 */
export function linkCard(md: MarkdownIt, ogpDatas: OgpDataRes[]) {
  md.core.ruler.after('replacements', 'link_card', ({ tokens }) => {
    // 埋め込み許可のレベル
    let allowLevel = 0;
    // https://から始まるリンクのみが対象
    const linkRegex = /^https:\/\//;
    // tokensは配列
    tokens.forEach((token, i) => {
      // autolinkはinlineのchildrenにのみ存在するのでそれ以外は除外
      if (token.type !== 'inline') return;

      if (!token.children) return;

      const autolink = token.children.some(
        (child) => child.markup === 'linkify',
      );
      if (!autolink) return;

      // p要素に囲まれている場合のみ変換
      const parentToken = tokens[i - 1];
      const isParentRootParagraph =
        parentToken &&
        parentToken.type === 'paragraph_open' &&
        parentToken.level === allowLevel;
      if (!isParentRootParagraph) return;

      // リンクカードの生成
      token.children.forEach((child) => {
        if (
          child.content &&
          child.type === 'text' &&
          child.markup !== 'linkify' &&
          linkRegex.test(child.content)
        ) {
          // ogpDataのリンクと同じ場合htmlを生成する
          const ogpData = ogpDatas.find((data) => {
            return data.ogUrl === child.content;
          });
          console.log(ogpData);

          if (ogpData) {
            child.content = `
              <section class="md-link-card">
                <div class="og-text">
                  <h1>${trancateValue(ogpData.ogTitle, 50)}</h1>
                  <div class="og-text__icon">
                    ${
                      ogpData.favicon
                        ? `<img src="${ogpData.favicon ?? 'リンクカードのfaviconです'}" />`
                        : ``
                    }
                    <p>${ogpData.ogSiteName}</p>
                  </div>
                </div>
                <div class="og-img">
                  <img src="${ogpData.ogImage[0].url}" alt="${ogpData.ogImage[0].alt ?? 'リンクカードのイメージです'}">
                </div>
              </section>
            `;
            child.type = 'html_block';
          }
        }
      });
    });
  });

  return true;
}
