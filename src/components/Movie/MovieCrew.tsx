import { ICrewMember } from "../../types/tmdb.models";

interface Props {
  members: ICrewMember[];
}

export default function MovieCrew({ members }: Props) {
  const memberItem = (member: ICrewMember) => {
    return (
      <li className="crew-item" key={`${member.job}_${member.id}`}>
        <span className="crew-item__label">{member.job}</span>
        <span className="crew-item__value">{member.name}</span>
      </li>
    );
  };
  return (
    <ul className="crew-list">{members.map((member) => memberItem(member))}</ul>
  );
}