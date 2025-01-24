import { TbTrash } from "react-icons/tb";
import { TextSize } from "../../types/text.size";
import { ButtonType } from "../../types/button.type";

interface Props {
  textSize?: TextSize;
  onClick?: () => void;
  type?: ButtonType;
}

export function DeleteButton({
  onClick = undefined,
  textSize = "2xl",
  type = "button",
}: Props) {
  const className = `text-${textSize} hover:text-amber-400 cursor-pointer outline-0`;
  return (
    <button title="Delete" className={className} type={type} onClick={onClick}>
      <TbTrash />
    </button>
  );
}
