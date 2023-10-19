import SvgIcon from './SvgIcon'

interface Props {
  icon: string
  label: string
  link?: { href: string; text: string } | null
}

const IconLabeled: React.FC<Props> = ({ icon, label, link = null }) => {
  return (
    <span className="icon-labeled m-text_light m-text_normal">
      <SvgIcon icon={icon} />
      <span className="icon-labeled__label">{label}</span>
      {link && <a href={link.href}>{link.text}</a>}
    </span>
  )
}

export default IconLabeled
