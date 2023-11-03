const Logo: React.FC = () => (
  <a className="logo flex" href="/" aria-label="go to homepage">
    <picture className="logo__picture">
      <source
        srcSet="./public/mdb-logo.svg"
        type="image/svg+xml"
        media="(min-width: 744px)"
      />
      <img
        className="logo__img"
        src="./public/mdb-logo-sm.svg"
        alt="Movies DB logo"
        width="721"
        height="98"
      />
    </picture>
  </a>
)

export default Logo
