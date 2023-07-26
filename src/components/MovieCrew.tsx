import { MemberData } from "../data.types"

interface Props {
    members: MemberData[];
}

export default function MovieCrew({ members }: Props) {
    const memberItem = (data: MemberData) => {
        return (
            <li className="crew-item" key={data.id}>
                <span className="crew-item__label">{data.label}</span>
                <span className="crew-item__value">{data.name}</span>
            </li>
        )
    }
    return (
        <ul className="crew-list">
            {members.map((member) => memberItem(member))}
        </ul>
    )
}
