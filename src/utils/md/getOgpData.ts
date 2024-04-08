import ogs from 'open-graph-scraper';

/**
 * リンク先の情報を取得する
 * @param url
 */
export async function getOgpData(floatLinks: string[]) {
  let res: any = [];

  if (floatLinks.length === 0) {
    return res;
  }

  const result = await Promise.all(
    floatLinks.map(async (link) => {
      const { error, html, result, response } = await ogs({ url: link });

      // エラー時とデータ取得失敗の際
      if (error || !result.success) {
        if (error) {
          console.error('ogp取得エラー1', error);
        } else if (!result.success) {
          console.error('ogp取得エラー2', result.success);
        }

        return response;
      }

      // OGPデータ取得に成功
      res.push(result);
    }),
  );

  // console.log('レスポンス', res);
  return res;
}

/**
 * mdから直書きのリンクのみを配列に入れる
 * @param md マークダウン
 * @returns
 */
export function getFloatingLinks(md: string) {
  const regFloatLink =
    /(?<!\()https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+/g;
  const floatLinks = md.match(regFloatLink);

  return floatLinks ?? [];
}
