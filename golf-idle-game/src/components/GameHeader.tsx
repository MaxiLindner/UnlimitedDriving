import React from 'react'
import {doGame} from "./GameContext.tsx";

export const GameHeader: React.FC = () => {
    const { state } = doGame()

    return (
        <div className="GameHeader" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1>Putting makes the MOMOMOMONEY</h1>
            <div className="MoneyDisplay" style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
                ${state.money.toFixed(2)}
            </div>
        </div>
    )
}