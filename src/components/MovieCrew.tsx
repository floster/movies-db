import { IMovieCrew } from "../types/tmdb.types";

interface Props {
    members: IMovieCrew[];
}

export default function MovieCrew({ members }: Props) {
    const memberItem = (member: IMovieCrew) => {
        return (
            <li className="crew-item" key={`${member.job}_${member.id}`}>
                <span className="crew-item__label">{member.job}</span>
                <span className="crew-item__value">{member.title}</span>
            </li>
        )
    }
    return (
        <ul className="crew-list">
            {members.map((member) => memberItem(member))}
        </ul>
    )
}
