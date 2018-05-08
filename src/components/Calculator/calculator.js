import React, { Component } from 'react';
import './calculator.css';

class Calculator extends Component {
    constructor() {
        super();

        this.state = { screen: 0, expression: '', lastNumber: 0, secondLastNumber: 0};

        this.calculate = this.calculate.bind(this);
        this.addToExpression = this.addToExpression.bind(this);
        this.clear = this.clear.bind(this);
        this.reset = this.reset.bind(this);
    }

    calculate() {
        // eslint-disable-next-line
        const answer = eval(this.state.expression);
        this.setState({ screen: answer, expression: answer, lastNumber: answer, secondLastNumber: 0 });
    }

    clear() {
        const newExpression = this.state.expression.slice(0,this.state.expression.length - 1);
        this.setState({ expression: newExpression, screen: newExpression})
    }

    reset() {
        this.setState({ screen: 0, expression: '', lastNumber: 0, secondLastNumber: 0 });
    }

    addToExpression(event) {
        console.log('event', event.target.value)
        if(!isNaN(event.target.value)) {
            const value = event.target.value
            this.setState(function(prevState) {
                if(prevState.lastNumber) {
                    return {
                        lastNumber: Number('' + prevState.lastNumber + '' + value)
                    }
                } else {
                    return {
                        lastNumber: value
                    }
                }
            });
        } else {
            this.setState({ secondLastNumber: this.state.lastNumber, lastNumber: null})
        }

        console.log('last number', this.state.lastNumber)
        console.log('second last number', this.state.secondLastNumber)
        let newExpression = this.state.expression + event.target.value;
        let newScreen;
        if(this.state.screen !== 0) {
            if(event.target.value !== '%' && event.target.value !== 's') {
                newScreen = this.state.screen + event.target.value;
            } else {
                console.log('% or s')

                let i = newExpression.length - 2;
                while(!isNaN(newExpression[i]) && i >= 0) {
                    i--;
                }

                console.log('i',i,'newExpression', newExpression)
                if(event.target.value === '%') {
                    

                    //percentage / 100 * number
                    console.log(this.state.lastNumber)
                    const percentageValue = this.state.lastNumber / 100 * this.state.secondLastNumber;

                    newExpression = newExpression.slice(0, i + 1) + '' + percentageValue;
                    newScreen = newExpression.slice(0, i + 1) + '' + percentageValue;
                } else if(event.target.value === 's') { //square root
                    console.log('square')
                    newExpression = newExpression.slice(0, i+1) + '' + Math.sqrt(this.state.lastNumber);
                    newScreen = newExpression.slice(0, i+1) + '' + Math.sqrt(this.state.lastNumber);
                }
            }
        } else {
            newScreen = event.target.value;
        }

        this.setState(() => ({
            screen: newScreen,
            expression: newExpression
        }));
    }

    render() {
        return (
            <div onKeyDown={this.addToExpression} className="calculator">
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
                    <button onClick={this.addToExpression} value='0'>0</button>
                </div>
                <div className="operators">
                    <button onClick={this.addToExpression} value='+'>+</button>
                    <button onClick={this.addToExpression} value='-'>-</button>
                    <button onClick={this.addToExpression} value='/'>/</button>
                    <button onClick={this.addToExpression} value='*'>*</button>
                    <button onClick={this.addToExpression} value='%'>%</button>
                    <button onClick={this.addToExpression} value='s'>&radic;</button>
                </div>
                <div className="commands">
                    <button onClick={this.clear}>C</button>
                    <button  onClick={this.reset}>C/E</button>
                    <button onClick={this.calculate}>=</button>
                </div>
            </div>
        )
    }
}

export default Calculator;