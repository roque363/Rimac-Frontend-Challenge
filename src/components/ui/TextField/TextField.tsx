import { useState, useEffect, useRef, type InputHTMLAttributes, type ChangeEvent } from 'react';
import styles from './TextField.module.scss';

type Variant = 'default' | 'left' | 'right';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  label: string;
  maxLength?: number;
}

const TextField = (props: TextFieldProps) => {
  const {
    variant = 'default',
    name,
    type = 'text',
    label,
    maxLength,
    value: propValue = '',
    onChange,
    style,
    ...rest
  } = props;
  const [value, setValue] = useState(propValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) {
      const truncatedEvent = {
        ...event,
        target: {
          ...event.target,
          value: newValue.slice(0, maxLength),
        },
      };

      setValue(truncatedEvent.target.value);
      onChange?.(truncatedEvent);
      return;
    }

    setValue(newValue);
    onChange?.(event);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const shouldLabelFloat = isFocused || value !== '';
  return (
    <div className={`${styles.textField} ${styles[variant]}`} style={style}>
      <label
        htmlFor={name}
        className={`${styles.textField__label} ${
          shouldLabelFloat ? styles['textField__label--float'] : ''
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </label>
      <input
        className={styles.textField__input}
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete="off"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  );
};

export default TextField;
