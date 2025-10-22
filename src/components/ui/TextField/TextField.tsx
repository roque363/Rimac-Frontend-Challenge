import {
  useState,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type ChangeEvent,
  useId,
} from 'react';
import styles from './TextField.module.scss';
import clsx from '@root/utils/clsx';
import Stack from '../Stack';

type Variant = 'default' | 'left' | 'right';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
  label: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
}

const TextField = (props: TextFieldProps) => {
  const {
    variant = 'default',
    name,
    id,
    type = 'text',
    label,
    helperText,
    error,
    maxLength,
    value: propValue = '',
    onChange,
    style,
    className,
    ...rest
  } = props;
  const autoId = useId();
  const inputId = id ?? name ?? `tf-${autoId}`;
  const helperId = helperText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-err` : undefined;
  const [value, setValue] = useState(propValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;
  const hasError = Boolean(error);
  const shouldLabelFloat = isFocused || value !== '';

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (typeof maxLength === 'number' && maxLength > 0 && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
      const synthetic = {
        ...event,
        target: { ...event.target, value: newValue },
        currentTarget: { ...event.currentTarget, value: newValue },
      } as unknown as ChangeEvent<HTMLInputElement>;
      setValue(newValue);
      onChange?.(synthetic);
      return;
    }

    setValue(newValue);
    onChange?.(event);
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const rootClass = clsx(
    styles.textField,
    styles[variant],
    hasError ? styles['textField--error'] : '',
    className ?? ''
  );

  return (
    <Stack style={{ width: '100%' }}>
      <div className={rootClass} style={style}>
        <label
          htmlFor={inputId}
          className={`${styles.textField__label} ${
            shouldLabelFloat ? styles['textField__label--float'] : ''
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          className={styles.textField__input}
          type={type}
          value={value}
          maxLength={maxLength}
          autoComplete="off"
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(type === 'number' ? { inputMode: 'numeric', pattern: '[0-9]*' } : null)}
          {...rest}
        />
      </div>
      {helperText && !error && (
        <p id={helperId} className={styles.textField__helper}>
          {helperText}
        </p>
      )}
    </Stack>
  );
};

export default TextField;
