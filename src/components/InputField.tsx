import { useState } from 'react';
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
    type?: "text" | "number" | "float"
    symbol?: string
}

export const InputField = (props: InputFieldProps) => {
    // create a state variable to store the value of the input field
    const [state, setState] = useState<string | number>(props.value);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
        if (props.type === "number") {
            try {
                console.log("Parsing number: " + event.target.value);
                const value = parseInt(event.target.value);
                if (!isNaN(value) && props.onChange != null) {
                    props.onChange(event);
                }
            }
            catch {
                console.log("Error parsing number");
            }
        } else if (props.onChange != null) {
            props.onChange(event);
        }
    }

    const canParse = (value: string | number) => {
        console.log("Can parse: " + value);
        let canParseBool = false;
        if (props.type === "number") {
            canParseBool = true;
            // validate that the string does not contains any caracter that is not a number
            for (let i = 0; i < value.toString().length; i++) {
                if (isNaN(parseInt(value.toString()[i])) && value.toString()[i] !== "-") {
                    canParseBool = false;
                    break;
                }
                else {
                    canParseBool = true;
                }
            }
        }
        else if (props.type === "float") {
            canParseBool = true;
            // validate that the string does not contains any caracter that is not a number
            for (let i = 0; i < value.toString().length; i++) {
                if (isNaN(parseInt(value.toString()[i])) && value.toString()[i] !== "." && value.toString()[i] !== "-") {
                    canParseBool = false;
                    break;
                }
                else {
                    canParseBool = true;
                }
            }
        }
        else {
            canParseBool = true;
        }

        console.log("Can parse: " + value + " " + canParseBool);

        return canParseBool;
    }

    const canParseB = canParse(state);

    return (
        <div className={styles.inputContainer}>
            <span title={props.tooltip}>{props.label}: </span>
            <input
                title={props.type}
                type={"text"}
                className={styles.textbox}
                aria-label={props.ariaLabel}
                value={state ?? ''}
                onChange={onChange}
                disabled={props.disabled || props.isLock}
                style={{ border: canParseB ? '' : '4px solid #FF0000', borderRadius: canParseB ? '' : '1px' }}
            />
            {props.symbol && <span className={styles.symbol}>{props.symbol}</span>}

            {props.lockable && 
                <input type="checkbox" 
                       onChange={(args) => props.isLock && props.onLock !== undefined ? props.onLock(args) : undefined} 
                       checked={!props.isLock}></input>}
        </div>
    )
}
