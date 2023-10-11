import { kebabText } from "../../js/helpers";
import { IBelongs } from "../../types/tmdb.models";
import IconLabeled from "../UI/IconLabeled";

interface Props {
  data: IBelongs | null;
}

export default function PartOf({ data }: Props) {
  if (!data) return null;

  const linkData = {
    href: `/collection/${data.id}-${kebabText(data.name)}`,
    text: data.name,
  };

  return (
    <div className="part-of">
      <IconLabeled icon="stack" label="part of" link={linkData} />
    </div>
  );
}
