import React from 'react'
import {doGame} from "./GameContext.tsx";

export const GameHeader: React.FC = () => {
    const { state } = doGame()

    console.log(state)

    return (
        <div className="GameHeader" style={{
            width: '100%',
            marginBottom: '30px',
            textAlign: 'center',
            padding: '20px 0',
            backgroundColor: '#f8f9fa'
        }}>
            <h1>Putting makes the MONEY</h1>
            <div className="MoneyDisplay" style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'green',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
            }}>
                <span>${state.money.toFixed(2)}</span>
                <span>(+${state.incomePerSecond.toFixed(2)}/s)</span>
            </div>
        </div>
    )
}