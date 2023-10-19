import { kebabText } from '../../utils/helpers'
import { IRawBelongs } from '../../types/tmdb.models'
import IconLabeled from '../UI/IconLabeled'

interface Props {
  data: IRawBelongs | null
}

const PartOf: React.FC<Props> = ({ data }) => {
  if (!data) return null

  const linkData = {
    href: `/collection/${data.id}-${kebabText(data.name)}`,
    text: data.name,
  }

  return (
    <div className="part-of">
      <IconLabeled icon="stack" label="part of" link={linkData} />
    </div>
  )
}

export default PartOf
