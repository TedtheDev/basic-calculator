import React from 'react';
import './calculator.css';

const Calculator = props => {
    return (
        <div className="calculator">
            <div className="screen">Screen</div>
            <div className="numbers">numbers</div>
            <div className="operators">operations</div>
            <div className="commands">commands</div>
        </div>
    )
}

export default Calculator;