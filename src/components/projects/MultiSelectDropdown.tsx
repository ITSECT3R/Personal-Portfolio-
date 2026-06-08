import { useEffect, useId, useRef, useState } from 'react';
import styles from '../../styles/projects/filter.module.css';

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  /** Optional map of raw option value → display label (e.g. 'frontend' → 'Front-End') */
  labelMap?: Record<string, string>;
};

export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  labelMap,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = (option: string) =>
    onChange(
      selected.includes(option)
        ? selected.filter(s => s !== option)
        : [...selected, option]
    );

  const count = selected.length;

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${count > 0 ? styles.dropdownTriggerActive : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{label}</span>
        {count > 0 && (
          <span
            className={styles.dropdownBadge}
            aria-label={`${count} selected`}
          >
            {count}
          </span>
        )}
        <span
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={panelId}
          className={styles.dropdownPanel}
          role="group"
          aria-label={`${label} filter options`}
        >
          {count > 0 && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => onChange([])}
            >
              Clear all
            </button>
          )}
          <ul className={styles.optionList}>
            {options.map(option => {
              const checked = selected.includes(option);
              const inputId = `${panelId}-${option}`;
              return (
                <li key={option}>
                  <label
                    htmlFor={inputId}
                    className={`${styles.checkOption} ${checked ? styles.checkOptionChecked : ''}`}
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(option)}
                      className={styles.checkInput}
                    />
                    <span className={styles.checkMark} aria-hidden="true" />
                    {labelMap ? (labelMap[option] ?? option) : option}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
