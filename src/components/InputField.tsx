import styles from './InputField.module.css';

interface InputFieldProps {
    label: string
    value: string | number
    onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange']
    ariaLabel: string | undefined
    disabled?: boolean
}

export const InputField = (props: InputFieldProps) => {
    return (
        <div>
            <span>{props.label}: </span>
            <input
                className={styles.textbox}
                aria-label={props.ariaLabel}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </div>
    )
}