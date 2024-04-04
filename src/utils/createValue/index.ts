import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(utc);
dayjs.extend(advancedFormat);

// unix時間を年月日にフォーマット
export function unixYMD(value: number) {
  return dayjs.unix(value / 1000).format('YYYY-MM-DD');
}

// 日本時間のミリ秒単位で現在のunix時間を返却
export function createUnix() {
  const unix = dayjs().valueOf();
  return unix;
}

// 全角スペースを半角へ変換
export function convertFullWidth(text: string) {
  return text.replace(/　/g, ' ');
}

// カテゴリ名とパス名のオブジェクトを生成する
export function createCategoryObj(categories: string, searchName: string) {
  const arrCategories = categories.split(',');
  const arrSearchName = searchName.split(',');

  const categoriesObj = arrCategories.reduce(
    (obj: Array<{ name: string; path: string }>, key, index) => {
      obj.push({ name: key, path: arrSearchName[index] });
      return obj;
    },
    [],
  );

  return categoriesObj;
}

// 文字数フォーマット
export function trancateValue(str: string, max: number) {
  if (str.length <= max) {
    return str;
  } else {
    return str.slice(0, max - 3) + '...';
  }
}
