import { TbDeviceFloppy } from "react-icons/tb";
import { ButtonType } from "../../types/button.type";
import { TextSize } from "../../types/text.size";

interface Props {
  textSize?: TextSize;
  onClick?: () => void;
  type?: ButtonType;
}

export function SaveButton({
  onClick = undefined,
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
