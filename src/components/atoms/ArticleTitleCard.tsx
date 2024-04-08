import { API_RES_TYPE } from '@/types/api';

interface ArticleTitleCardProps {
  data: API_RES_TYPE['articles'];
  color?: string;
  type?: number; // hタグの番号 デフォルトはh2
}

export default function ArticleTitleCard({
  data,
  color,
  type = 3,
}: ArticleTitleCardProps) {
  function categoriesSplit(categories: string) {
    const categoriesArray = categories
      .split(',')
      .map((category) => category.trim());
    return categoriesArray.splice(0, 2);
  }

  return (
    <div
      className={`${color ? color : 'bg-BgNeutral'} p-4 rounded-2xl hover:shadow-md h-[11rem]`}
    >
      <div className='flex flex-col h-full overflow-hidden'>
        <div className='flex-1 flex justify-center items-center'>
          {type === 1 && (
            <h1 className='text-CardText font-bold text-[1.3rem]'>
              {data.title}1
            </h1>
          )}
          {type === 2 && (
            <h2 className='text-CardText font-bold text-[1.2rem]'>
              {data.title}
            </h2>
          )}
          {type === 3 && (
            <h3 className='text-CardText font-bold text-[1.1rem]'>
              {data.title}
            </h3>
          )}
        </div>
        <div className='overflow-hidden min-h-[1.9rem] max-h-[1.8rem] flex justify-end items-end text-[0.9rem]'>
          {categoriesSplit(data.categories).map((category, index) => (
            <div
              key={index}
              className='bg-blue-400 text-White ml-2 py-1 px-2 flex justify-center items-center rounded-lg shadow-sm'
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
