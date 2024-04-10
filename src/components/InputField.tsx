import styles from './InputField.module.css';

interface InputFieldProps {
    label: string
    value: string | number
    onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange']
    ariaLabel: string | undefined
    disabled?: boolean
    lockable?: boolean
    isLock?: boolean
    onLock?: React.InputHTMLAttributes<HTMLInputElement>['onChange']
    tooltip?: string
}

export const InputField = (props: InputFieldProps) => {
    return (
        <div>
            <span title={props.tooltip}>{props.label}: </span>
            <input
                className={styles.textbox}
                aria-label={props.ariaLabel}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled || props.isLock}
            />

            {props.lockable && 
                <input type="checkbox" 
                       onChange={(args) => props.isLock && props.onLock !== undefined ? props.onLock(args) : undefined} 
                       checked={!props.isLock}></input>}
        </div>
    )
}