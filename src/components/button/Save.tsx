import { TbDeviceFloppy } from "react-icons/tb";

interface Props {
  textSize?: "xl" | "2xl" | "3xl";
  onClick: () => void;
  type?: "button" | "submit";
}

export function SaveButton({
  onClick,
  textSize = "2xl",
  type = "button",
}: Props) {
  const className = `text-${textSize} hover:text-amber-400 cursor-pointer outline-0`;
  return (
    <button title="Add" className={className} type={type} onClick={onClick}>
      <TbDeviceFloppy />
    </button>
  );
}
