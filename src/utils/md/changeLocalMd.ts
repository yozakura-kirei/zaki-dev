import fs from 'fs';
import path from 'path';
import { changeHtml } from './changeHtml';

/**
 * 静的なファイルをマークダウンに変換
 * @param filename マークダウンファイルパス
 */
export function localMdChangeHtml(filePath: string): any {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), 'src/static', filePath),
    'utf-8',
  );
  const result = changeHtml(markdown);
  return result;
}
