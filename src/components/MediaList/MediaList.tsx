import { ITile } from "../../types/tmdb.models";
import AppTile from "../AppTile";

interface Props {
  media: ITile[] | [];
}

export default function MediaList({ media }: Props) {
  return (
    <div className="media-list l-media_list" role="list">
      {media.map((item) => (
        <AppTile tile={item as ITile} key={item.id} isRow={true} />
      ))}
    </div>
  );
}
