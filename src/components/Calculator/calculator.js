import React, { Component } from 'react';
import styled from 'styled-components';

const CalculatorDiv = styled.div`
    display: grid;
    grid-template: 1.2fr 6fr 1fr / 5fr 1fr;
    grid-template-areas: 
        "screen screen"
        "numbers operators"
        "commands commands";
    background: grey;
    border-radius: 15px;
    height: 70%;
    width: 50%;
    outline: none;
    border: 5px solid grey;
`;

const CalculatorScreenDiv = styled.div`
    grid-area: screen;
    display: flex;
    justify-content: end;
    align-items: center;
    background: rgb(208, 227, 230);
    padding: 10%;
    margin: 10%;
    border-radius: 15px;
    color: black;
    font-size: 5vw;
    overflow:hidden;

    & div {
        overflow-x: auto;
        width: 100%;
    }
`;

const CalculatorNumbersDiv = styled.div`
    grid-area: numbers;
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr / 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;

    & button {
        height: 50%;
        margin: 0 3%;
        border: .1rem solid black;
        cursor: pointer;
        background: green;
        color: white;
        border-radius: .3rem;
    }
`;

const CalculatorOperators = styled.div`
    grid-area: operators;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & button {
        height: 15%;
        border: .1rem solid black;
        cursor: pointer;
        background: green;
        color: white;
        border-radius: .3rem;
    }
`;


const CalculatorCommands = styled.div`
    grid-area: commands;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & button {
        width: 100%;
        margin: 0 .1rem;
        border: .1rem solid black;
        cursor: pointer;
        background: green;
        color: white;
        border-radius: .3rem;
    }
`;

const removeLeadingZeros = num => {
    let charArray = num.split('').slice(0);
    for(let i = 0; i < charArray.length; i++) {
        if(charArray[i] === '0') {
            charArray = charArray.slice(i + 1);
            i--;
        } else {
            break;
        }
    }
    return charArray.join('');
}

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = { screen: 0, expression: '', lastNumber: 0, secondLastNumber: 0, operator: false};
    }

    calculate = () => {
        if(!this.state.operator) {
            console.log('not cleaned', this.state.expression);
            const cleanedExpression = removeLeadingZeros(this.state.expression)
            console.log('cleaned', cleanedExpression);
            // eslint-disable-next-line
            const answer = eval(cleanedExpression);
            this.setState({ screen: answer, expression: answer, lastNumber: answer, secondLastNumber: 0 });
        }
        
    }

    clear = () => {
        let newExpression;
        let screen;
        if(this.state.expression.length > 1) {
            newExpression = this.state.expression.slice(0,this.state.expression.length - 1);
            screen = newExpression
        } else {
            newExpression = '';
            screen = 0;
        }
        
        this.setState({ expression: newExpression, screen: screen})
    }

    reset = () => {
        this.setState({ screen: 0, expression: '', lastNumber: 0, secondLastNumber: 0 });
    }

    addToExpression = (event) => {
        console.log('event',event)
        const keyCodes = ['Backspace','Enter', '0','1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/']
        const keyCharCodes = ['8', '13','96','97','98','99','100','101','102','103','104','105','110','107','109','106','111']
        let value;
        if((event.key || event.keyCode) && (keyCodes.includes(event.key) || keyCharCodes.includes(event.keyCode))) {
            if(event.key === 'Enter' || event.keyCode === '13') {
                this.calculate();
            }
            
            if(event.key === 'Backspace' || event.keyCode === '8') {
                this.clear();
            }
            value = event.key || event.code;
            
        } else {
            value = event.target.value;
        }

        if(!isNaN(value)) { //account for keyCode too otherwise enter will be 13
            console.log('is a number')
            this.setState(function(prevState) {
                if(prevState.lastNumber) {
                    return {
                        lastNumber: Number('' + prevState.lastNumber + '' + value), //concatenating on to the lastNumber
                        operator: false 
                    }
                } else {
                    return {
                        lastNumber: Number(value),
                        operator: false
                    }
                }
            });
        } else {
            console.log('not a number',value)
            const operator = value !== '%';
            if(!this.state.expression && value !== '+' && value !== '-') {
                // starts with *,/,%,s
                // terminate
                return;
            }
            this.setState({ secondLastNumber: this.state.lastNumber, lastNumber: null, operator: operator})
        }
        console.log('value', value)
        if(value !== 'Enter') {
            console.log('last number', this.state.lastNumber)
            console.log('second last number', this.state.secondLastNumber)
            let newExpression = this.state.expression + value;
            let newScreen;
            if(this.state.screen !== 0) {
                if(value !== '%' && value !== 's') {
                    newScreen = this.state.screen + value;
                } else {
                    // percentage or square root
                    console.log('% or s')
    
                    let i = newExpression.length - 2;
                    while(!isNaN(newExpression[i]) && i >= 0) {
                        i--;
                    }
    
                    console.log('i',i,'newExpression', newExpression)
                    if(value === '%') {
                        
    
                        //percentage / 100 * number
                        console.log(this.state.lastNumber)
                        const percentageValue = this.state.lastNumber / 100 * this.state.secondLastNumber;
    
                        newExpression = newExpression.slice(0, i + 1) + '' + percentageValue;
                        newScreen = newExpression.slice(0, i + 1) + '' + percentageValue;
                    } else if(value === 's') { //square root
                        console.log('square')
                        newExpression = newExpression.slice(0, i+1) + '' + Math.sqrt(this.state.lastNumber);
                        newScreen = newExpression.slice(0, i+1) + '' + Math.sqrt(this.state.lastNumber);
                    }
                }
            } else {
                newScreen = value;
            }
    
            this.setState(() => ({
                screen: newScreen,
                expression: newExpression
            }));
        }
        
    }

    componentDidMount = () => {
        document.addEventListener('keyup', this.addToExpression);
    }

    componentWillUnmount = () => {
        document.removeEventListener('keyup', this.addToExpression);
    }

    render() {
        return (
            <CalculatorDiv>
                <CalculatorScreenDiv><div>{this.state.screen}</div></CalculatorScreenDiv>
                <CalculatorNumbersDiv>
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
                </CalculatorNumbersDiv>
                <CalculatorOperators>
                    <button onClick={this.addToExpression} value='+'>+</button>
                    <button onClick={this.addToExpression} value='-'>-</button>
                    <button onClick={this.addToExpression} value='/'>/</button>
                    <button onClick={this.addToExpression} value='*'>*</button>
                    <button onClick={this.addToExpression} value='%'>%</button>
                    <button onClick={this.addToExpression} value='s'>&radic;</button>
                </CalculatorOperators>
                <CalculatorCommands>
                    <button onClick={this.clear}>C</button>
                    <button  onClick={this.reset}>C/E</button>
                    <button onClick={this.calculate}>=</button>
                </CalculatorCommands>
            </CalculatorDiv>
        )
    }
}

export default Calculator;