import React from 'react'
import {doGame} from "./GameContext.tsx";

export const GameHeader: React.FC = () => {
    const { state } = doGame()

    console.log(state)

    return (
        <div className="GameHeader" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1>Putting makes the MONEY</h1>
            <div className="MoneyDisplay" style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'green',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px'
            }}>
                <span>${state.money.toFixed(2)}</span>
                <span>(+${state.incomePerSecond.toFixed(2)}/s)</span>
            </div>
        </div>
    )
}
