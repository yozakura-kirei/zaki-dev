export default function ErrorMessage({ text }: { text: string }) {
  return (
    <div className='py-2 text-[0.8rem] text-red-600 font-semibold'>
      <span>{text}</span>
    </div>
  );
}
