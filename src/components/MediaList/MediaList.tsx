import { ITile } from "../../types/tmdb.models";
import { ITileData } from "../../types/tmdb.types";
import AppTile from "../AppTile";

interface Props {
  media: ITile[] | [];
}

export default function MediaList({ media }: Props) {
  return (
    <div className="media-list l-media_list" role="list">
      {media.map((item) => (
        <AppTile tile={item as ITileData} key={item.id} isRow={true} />
      ))}
    </div>
  );
}
