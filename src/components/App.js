import React, {useEffect, useRef, useState} from 'react'
import './App.css'

function App() {
    const [operand1, setOperand1] = useState(0)
    const [operand2, setOperand2] = useState(0)
    const [operator, setOperator] = useState('')
    const [result, setResult] = useState(0)

    const key0Ref = useRef(null)
    const key1Ref = useRef(null)
    const key2Ref = useRef(null)
    const key3Ref = useRef(null)
    const key4Ref = useRef(null)
    const key5Ref = useRef(null)
    const key6Ref = useRef(null)
    const key7Ref = useRef(null)
    const key8Ref = useRef(null)
    const key9Ref = useRef(null)

    const keyPlusRef = useRef(null)
    const keyMinusRef = useRef(null)
    const keyTimesRef = useRef(null)
    const keyDivRef = useRef(null)
    const keyResetRef = useRef(null)
    const keyEnterRef = useRef(null)

    useEffect(() => {
        const handleKeyboardEvent = e => {
            e.preventDefault()

            const { key } = e

            const numbers = '0123456789'.split('')
            const operators = '*-+/'.split('')
            const enter = ['Enter', '=']
            const clear = ['C', 'c', 'Delete', 'Backspace']

            const keyInputRef = val => { // method will look for suitable keyRef for the selected key
                if (enter.includes(val)) {
                    return keyEnterRef
                }

                if (operators.includes(val)) {
                    switch (val) {
                        case '+':
                            return keyPlusRef

                        case '-':
                            return keyMinusRef

                        case '*':
                            return keyTimesRef

                        case '/':
                            return keyDivRef

                        default:
                            return null
                    }
                }

                if (clear.includes(val)) {
                    return keyResetRef
                }

                if (numbers.includes(val)) {
                    switch (key) {
                        case '0':
                            return key0Ref

                        case '1':
                            return key1Ref

                        case '2':
                            return key2Ref

                        case '3':
                            return key3Ref

                        case '4':
                            return key4Ref

                        case '5':
                            return key5Ref

                        case '6':
                            return key6Ref

                        case '7':
                            return key7Ref

                        case '8':
                            return key8Ref

                        case '9':
                            return key9Ref

                        default:
                            return null
                    }
                }

                return null
            }

            const input = keyInputRef(key)

            if (input !== null) {
                input.current.click()
            }
        }

        document.addEventListener('keydown', handleKeyboardEvent)

        return () => document.removeEventListener('keydown', handleKeyboardEvent) // cleanup operation
    }, []) // this effect will run only once

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
            <div className="Row">
                <div className={"Calculator"}>
                    <div className={"Lcd"}>{result.toString().padStart(7, ' ').substring(0, 7)}</div>
                    <div className={"NumPad"}>
                        <div className={"Button"} ref={key7Ref} onClick={() => appendDigit(7)}>7</div>
                        <div className={"Button"} ref={key8Ref} onClick={() => appendDigit(8)}>8</div>
                        <div className={"Button"} ref={key9Ref} onClick={() => appendDigit(9)}>9</div>
                        <div className={"Button"} ref={keyDivRef} onClick={() => setOperator('/')}>/</div>

                        <div className={"Button"} ref={key4Ref} onClick={() => appendDigit(4)}>4</div>
                        <div className={"Button"} ref={key5Ref} onClick={() => appendDigit(5)}>5</div>
                        <div className={"Button"} ref={key6Ref} onClick={() => appendDigit(6)}>6</div>
                        <div className={"Button"} ref={keyTimesRef} onClick={() => setOperator('*')}>*</div>

                        <div className={"Button"} ref={key1Ref} onClick={() => appendDigit(1)}>1</div>
                        <div className={"Button"} ref={key2Ref} onClick={() => appendDigit(2)}>2</div>
                        <div className={"Button"} ref={key3Ref} onClick={() => appendDigit(3)}>3</div>
                        <div className={"Button"} ref={keyMinusRef} onClick={() => setOperator('-')}>-</div>

                        <div className={"Button"} ref={key0Ref} onClick={() => appendDigit(0)}>0</div>
                        <div className={"Button"}>.</div>
                        <div className={"Button"} ref={keyResetRef} onClick={() => reset(true)}>C</div>
                        <div className={"Button"} ref={keyPlusRef} onClick={() => setOperator('+')}>+</div>
                    </div>
                    <div className={"Button-Equals"} ref={keyEnterRef} onClick={() => calculateResult()}>=</div>

                    <p>{expression()}</p>
                </div>
                <div className="Text">
                    {/*<h5>Test</h5>*/}
                </div>
            </div>
        </div>
    )
}

export default App