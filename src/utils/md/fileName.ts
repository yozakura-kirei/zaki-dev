import MarkdownIt from 'markdown-it';

/**
 * コードブロックにファイル名を表示するプラグイン
 * ex. ```javascript:index.jsの形式をファイル名として解析する
 * @param md
 */
export function fileName(md: MarkdownIt) {
  // フェンスルールをオーバーライド
  const originalFence =
    md.renderer.rules.fence ||
    function (tokens, idx) {
      const token = tokens[idx];
      const info = token.info.trim();
      const lang = info.split(/\s+/)[0];

      // highlightを適用
      const content =
        md.options?.highlight?.(token.content, lang, '') || token.content;
      return `<pre><code class="${lang ? 'language-' + lang : ''}">${content}</code></pre>`;
    };

  // フェンスルールを追加
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = token.info.trim();
    const parts = info.split(/\s+/);

    // 言語とファイル名を取得
    const [lang, fileName] = info.split(':');

    // highlight.jsを適用
    let content =
      md.options?.highlight?.(token.content, lang, '') || token.content;

    // ファイル名がある場合のみ、ファイル名用のdivを追加
    if (fileName) {
      content = `<div class="filename-code-container">
        <div class="filename">${fileName}</div>
        <pre class="code-block">
          <code class="${lang ? 'language-' + lang : ''}">${content}</code>
        </pre>
      </div>`;
    } else {
      // ファイル名がない場合はオリジナルフェンスルールを使用
      return originalFence(tokens, idx, options, env, self);
    }

    return content;
  };
}
