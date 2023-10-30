import SvgIcon from './SvgIcon'

const Logo: React.FC = () => (
  <a className="logo flex" href="/" aria-label="go to homepage">
    <SvgIcon icon="logo_light" extraClass="logo__svg" logo={true} />
  </a>
)

export default Logo
