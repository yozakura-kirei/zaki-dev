interface MiniCardProps {
  categoryName: string;
  subText?: string | number;
}

/**
 * カテゴリのミニカード
 * @param param0
 * @returns
 */
export default function MiniCard({ categoryName, subText }: MiniCardProps) {
  return (
    <div className='bg-ThinGray text-sm py-2 px-4 rounded-xl shadow-md cursor-pointer hover:text-HoverGray'>
      <span className={`${subText ? 'mr-1' : ''}`}>{categoryName}</span>
      {subText && <span>({subText})</span>}
    </div>
  );
}
