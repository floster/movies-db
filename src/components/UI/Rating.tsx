interface Props {
  value: number | null
}

const Rating: React.FC<Props> = ({ value }) => {
  const label = value ? value : 'nr'
  const _value = value ? +value * 10 : 0

  return (
    <div
      className="app-progress"
      style={
        {
          '--value': _value === 0 ? null : _value,
        } as React.CSSProperties
      }
      role="progressbar"
      aria-valuenow={_value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`The Fast and the Furious Collection rating is + ${label}`}>
      {label}
    </div>
  )
}

export default Rating
