// // marked
// import DOMPurify from 'dompurify';
// import hljs from 'highlight.js';
// import { marked, MarkedOptions } from 'marked';

// export function changeHtml(markdown: string): string {
//   console.log(markdown);

//   console.log('マークダウン', marked(markdown));

//   const html = marked(markdown) as string;
//   // const sanitized = DOMPurify.sanitize(html as string);
//   return html;
// }

import markdownit from 'markdown-it';
import hljs from 'highlight.js';

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

  return md.render(markdown);
}
