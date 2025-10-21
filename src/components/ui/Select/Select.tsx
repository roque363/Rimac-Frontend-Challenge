import type { InputHTMLAttributes } from 'react';
import style from './Select.module.scss';

type Variant = 'default' | 'left' | 'right';

interface Options {
  value: string;
  text: string | number;
}

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  variant?: Variant;
  isValid: boolean;
  options: Options[];
}

const Select = ({ variant = 'default', isValid = true, options, ...rest }: SelectProps) => {
  return (
    <div
      className={`${style['select-container']} ${style[variant]} ${
        isValid ? style['default-border-color'] : style['error-border-color']
      }`}
    >
      <select
        className={isValid ? style['default-color'] : style['error-color']}
        name="document"
        id="document"
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
