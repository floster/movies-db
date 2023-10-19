import SvgIcon from './SvgIcon'

const Logo: React.FC = () => (
  <a className="app-header__logo flex" href="/" aria-label="go to homepage">
    <SvgIcon icon="logo_light" extraClass="app-header__logo-svg" logo={true} />
  </a>
)

export default Logo
