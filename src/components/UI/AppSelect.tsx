interface option {
  title: string;
  value: string;
}

interface Props {
  options: option[];
  currentOption: string;
  optionChanged: (option: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function AppSelect({
  options,
  currentOption,
  optionChanged,
  label,
  disabled,
}: Props) {
  return (
    <div className="app-select">
      {label && <label className="app-select__label">{label}</label>}
      <select
        value={currentOption}
        onChange={(e) => optionChanged(e.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
