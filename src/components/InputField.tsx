import { useState } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    label: string
    value: string | number
    onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange']
    onBlur?: React.InputHTMLAttributes<HTMLInputElement>['onBlur']
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
                const value = Number.parseInt(event.target.value);
                if (!Number.isNaN(value) && props.onChange != null) {
                    props.onChange(event);
                }
            }
            catch {
                console.log("Error parsing number");
            }
        }
        else if (props.type === "text") {
            console.log("Text input change, do nothing special");
            // do nothing special for text
        }
        else if (props.onChange != null) {
            console.log("Calling onChange for type other than number");
            try {
                props.onChange(event);
            }
            catch (error) {
                console.log("Error in onChange", error);
            }
        }
    }

    const canParse = (value: string | number) => {
        console.log("Can parse: " + value);
        let canParseValue = false;
        if (props.type === "number") {
            canParseValue = canParseNumber(value);
        }
        else if (props.type === "float") {
            canParseValue = canParseFloat(value);
        }
        else {
            console.log("else: can parse = true ");
            canParseValue = true;
        }

        console.log("Can parse: " + value + " " + canParseValue);

        return canParseValue;
    }

    const canParseB = canParse(state);

    return (
        <div className={styles.inputContainer}>
            <span className={styles.label} title={props.tooltip}>{props.label}:</span>
            {props.tooltip && (
                <span className={styles.tooltipWrapper}>
                    <span className={styles.infoIcon}>ⓘ<span className={styles.tooltip}>{props.tooltip}</span>
                    </span>
                </span>
            )}
            <input
                title={props.type}
                type={"text"}
                className={styles.textbox}
                aria-label={props.ariaLabel}
                value={state ?? ''}
                onChange={onChange}
                onBlur={props.onBlur}
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

function canParseFloat(value: string | number) {
    console.log("Validating float: " + value);
    let canParseValue = true;
    // validate that the string does not contains any caracter that is not a number
    for (const element of value.toString()) {
        if (Number.isNaN(Number.parseInt(element)) && element !== "." && element !== "-") {
            canParseValue = false;
            break;
        }
    }
    return canParseValue;
}

function canParseNumber(value: string | number) {
    console.log("Validating number: " + value);
    let canParseValue = false;
    if (value !== undefined) {
        canParseValue = true;
        // validate that the string does not contains any caracter that is not a number
        for (const element of value.toString()) {
            if (Number.isNaN(Number.parseInt(element)) && element !== "-") {
                canParseValue = false;
                break;
            }
        }
    }
    return canParseValue;
}

