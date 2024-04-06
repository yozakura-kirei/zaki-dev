interface MiniLabelProps {
  text: string;
  color?: string;
}

export default function MiniLabel({ text, color }: MiniLabelProps) {
  return (
    <span
      className={`p-2 px-4 rounded-lg mr-4 ${color ? color : 'bg-neutral-200'}`}
    >
      {text}
    </span>
  );
}
