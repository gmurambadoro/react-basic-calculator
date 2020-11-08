import React, {useEffect, useState} from 'react'
import './Styles.css'

const App = () => {
    const [operand1, setOperand1] = useState(0)
    const [operand2, setOperand2] = useState(0)
    const [operator, setOperator] = useState('')
    const [result, setResult] = useState(0)

    const appendDigit = val => {
        // check if we have an operator available and set the correct operand
        if (!operator) {
            const operand = String(operand1) + String(val)

            setOperand1(Number.parseInt(operand)) // update the state

            setResult(Number.parseInt(operand)) // the state doesn't update immediately
        } else {
            const operand = String(operand2) + String(val)

            setOperand2(Number.parseInt(operand)) // update the state

            setResult(Number.parseInt(operand)) // the state doesn't update immediately
        }
    }

    const reset = (withLcd = false) => {
        setOperator('')
        setOperand1(0)
        setOperand2(0)

        if (withLcd) {
            setResult(0)
        }
    }

    const calculateResult = () => {
        switch (operator) {
            case '+':
                setResult(operand1 + operand2)
                break

            case '-':
                setResult(operand1 - operand2)
                break

            case '*':
                setResult(operand1 * operand2)
                break

            case '/':
                setResult(operand1 / operand2)
                break
        }

        reset()
    }

    const expression = () => {
        if (!(operator || operand1)) {
            return
        }

        if (!operator) {
            return String(operand1)
        }

        return `${operand1} ${operator} ${operand2}`
    }

    return (
        <div className={"Container"}>
            <div className={"Calculator"}>
                <div className={"Lcd"}>{result.toString().padStart(7, ' ').substring(0, 7)}</div>
                <div className={"NumPad"}>
                    <div className={"Button"} onClick={() => appendDigit(7)}>7</div>
                    <div className={"Button"} onClick={() => appendDigit(8)}>8</div>
                    <div className={"Button"} onClick={() => appendDigit(9)}>9</div>
                    <div className={"Button"} onClick={() => setOperator('/')}>/</div>

                    <div className={"Button"} onClick={() => appendDigit(4)}>4</div>
                    <div className={"Button"} onClick={() => appendDigit(5)}>5</div>
                    <div className={"Button"} onClick={() => appendDigit(6)}>6</div>
                    <div className={"Button"} onClick={() => setOperator('*')}>*</div>

                    <div className={"Button"} onClick={() => appendDigit(1)}>1</div>
                    <div className={"Button"} onClick={() => appendDigit(2)}>2</div>
                    <div className={"Button"} onClick={() => appendDigit(3)}>3</div>
                    <div className={"Button"} onClick={() => setOperator('-')}>-</div>

                    <div className={"Button"} onClick={() => appendDigit(0)}>0</div>
                    <div className={"Button"}>.</div>
                    <div className={"Button"} onClick={() => reset(true)}>C</div>
                    <div className={"Button"} onClick={() => setOperator('+')}>+</div>
                </div>
                <div className={"Button-Equals"} onClick={() => calculateResult()}>=</div>

                <p>{expression()}</p>
            </div>
        </div>
    )
}

export default App