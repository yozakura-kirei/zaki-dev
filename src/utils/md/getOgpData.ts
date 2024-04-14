import ogs from 'open-graph-scraper';

export interface OgpDataRes {
  twitterCard: string;
  ogUrl: string;
  ogTitle: string;
  ogType: string;
  ogSiteName: string;
  ogImage: [
    {
      url: string;
      type: string;
      alt?: string;
    },
  ];
  ogLocale: string;
  favicon: string;
  charset: string;
  requestUrl: string;
  success: boolean;
}

/**
 * リンク先の情報を取得する
 * @param url
 */
export async function getOgpData(
  autolink: string[],
): Promise<OgpDataRes[] | undefined> {
  let res: any = [];

  if (autolink.length === 0) {
    return res;
  }
  if (!autolink) return;

  await Promise.all(
    autolink.map(async (link) => {
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

      // OGPデータ取得に成功;
      res.push(result);
    }),
  );

  return res;
}

/**
 * mdから直書きのリンクを取得し配列に入れる
 * @param md マークダウン
 * @returns
 */
export function extractLinks(md: string) {
  const regFloatLink =
    /(?<!\()https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+/g;
  const floatLinks = md.match(regFloatLink);

  return floatLinks ?? [];
}
