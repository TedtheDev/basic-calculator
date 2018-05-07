import React, { Component } from 'react';
import './calculator.css';

class Calculator extends Component {
    constructor() {
        super();

        this.state = { screen: null, expression: '' };

        this.calculate = this.calculate.bind(this);
        this.addToExpression = this.addToExpression.bind(this);
    }

    calculate() {
        // eslint-disable-next-line
        const answer = eval(this.state.expression);
        this.setState({screen: answer});
    }

    addToExpression(event) {
        console.log(event.target.value)
        const newExpression = this.state.expression + event.target.value;
        console.log('newExpression', newExpression)
        this.setState({ expression: newExpression});
    }
    render() {
        return (
            <div className="calculator">
                <div className="screen">{this.state.screen}</div>
                <div className="numbers">
                    <button onClick={this.addToExpression} value='7'>7</button>
                    <button onClick={this.addToExpression} value='8'>8</button>
                    <button onClick={this.addToExpression} value='9'>9</button>
                    <button onClick={this.addToExpression} value='4'>4</button>
                    <button onClick={this.addToExpression} value='5'>5</button>
                    <button onClick={this.addToExpression} value='6'>6</button>
                    <button onClick={this.addToExpression} value='1'>1</button>
                    <button onClick={this.addToExpression} value='2'>2</button>
                    <button onClick={this.addToExpression} value='3'>3</button>
                </div>
                <div className="operators">
                    <button onClick={this.addToExpression} value='+'>+</button>
                    <button onClick={this.addToExpression} value='-'>-</button>
                    <button onClick={this.addToExpression} value='/'>/</button>
                    <button onClick={this.addToExpression} value='*'>*</button>
                    <button onClick={this.addToExpression} value=''>%</button>
                    <button onClick={this.addToExpression} value=''>sq rt</button>
                </div>
                <div className="commands">
                    <button>C</button>
                    <button>C/E</button>
                    <button onClick={this.calculate}>=</button>
                </div>
            </div>
        )
    }
}

export default Calculator;