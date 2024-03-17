import dayjs from 'dayjs';

// unix時間を年月日にフォーマット
export function unixYMD(value: number) {
  return dayjs(value).format('YYYY-MM-DD');
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
