import { kebabText } from "../js/helpers";
import { IBelongs } from "../types/tmdb.models";
import SvgIcon from "./SvgIcon";

interface Props {
  data: IBelongs | null;
}

export default function PartOf({ data }: Props) {
  if (!data) return null;

  return (
    <div className="part-of">
      {/* TODO: make a component for this */}
      <span className="icon-labeled">
        <SvgIcon icon="stack" />
        <span className="icon-labeled__label">
          part of{" "}
          <a href={`/collection/${data.id}-${kebabText(data.name)}`}>
            {data.name}
          </a>
        </span>
      </span>
    </div>
  );
}
