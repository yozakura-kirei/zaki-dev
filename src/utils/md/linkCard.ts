import Token from 'markdown-it/lib/token';
import MarkdownIt from 'markdown-it';
import ogs from 'open-graph-scraper';
import { OgpDataRes, getOgpData } from './getOgpData';
import cheerio from 'cheerio';
// import { getOgpData } from './getOgpData';

/**
 * 直書きリンクをリンクカードに変換する
 */
export function linkCard(md: MarkdownIt, ogpDatas: OgpDataRes[]) {
  md.core.ruler.after('replacements', 'link_card', ({ tokens }) => {
    // 埋め込み許可のレベル
    let allowLevel = 0;
    // https://から始まるリンクのみが対象
    const linkRegex = /^https:\/\//;
    console.log('オプション後');
    // tokensは配列
    tokens.forEach((token, i) => {
      // for (let i = 0; i < tokens.length; i++) {
      // const token = tokens[i];
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
      // for (const child of token.children) {
      token.children.forEach((child) => {
        if (
          child.content &&
          child.type === 'text' &&
          child.markup !== 'linkify' &&
          linkRegex.test(child.content)
        ) {
          console.log('リンクのみ', child.content);

          // ogpDataがある場合はリンクカードを生成する
          const linkUrl = child.content.trim();
          console.log('リンクURL', linkUrl);
          const ogpData = ogpDatas.find((data) => {
            // console.log('findデータ', data);
            return data.ogUrl === child.content;
          });
          console.log('これで見つかったか？', ogpData);

          if (ogpData) {
            child.content = `
              <div class="md-link-card">
                <div>
                  <h1>${ogpData.ogTitle}</h1>
                  <div>
                    ${
                      ogpData.favicon
                        ? `<img src="${ogpData.favicon ?? 'リンクカードのfaviconです'}" />`
                        : ``
                    }
                    <p>${ogpData.ogSiteName}</p>
                  </div>
                </div>
                <div>
                  <img src="${ogpData.ogImage[0].url}" alt="${ogpData.ogImage[0].alt ?? 'リンクカードのイメージです'}">
                </div>
              </div>
            `;
            child.type = 'html_block';
            console.log('html変換後', child.content);
          }
        }
      });
      console.log('最初の処理の最終');
    });
    console.log('最終処理');
  });

  console.log('リンクカードの最終');
  return true;
}
