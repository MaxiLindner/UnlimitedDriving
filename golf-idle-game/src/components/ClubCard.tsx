import React from 'react'
import {doGame} from "./GameContext.tsx";
import {ClubDefinitions} from "../clubs/ClubDefinitions";

interface ClubCardProps {
    club: {
        id: number
        name: string
        cost: number
        costType: 'money' | number
        produces: 'money' | number
        revenue?: number
        productionTime?: number
    }
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    const { state, dispatch } = doGame()

    const owned = state.clubs[club.id]?.owned || 0
    const canAfford = club.costType === 'money'
        ? state.money >= club.cost
        : state.clubs[club.costType].owned >= club.cost

    const handleBuy = () => {
        dispatch({ type: 'BUY_CLUB', clubId: club.id })
    }

    return (
        <div style={{
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            width: '200px',
            backgroundColor: canAfford ? '#f0f8f0' : '#f8f8f8'
        }}>
            <h3>{club.name}</h3>
            <div style={{ margin: '10px 0' }}>
                Owned: {owned}
            </div>
            <div style={{ margin: '10px 0' }}>
                Cost: {club.cost} {club.costType === 'money' ? '$' : 'clubs'}
            </div>
            {club.produces === 'money' && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Produces: ${club.revenue}/sec
                </div>
            )}
            {typeof club.produces === 'number' && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                    Produces: 1 {ClubDefinitions[club.produces].name}/
                    {club.productionTime ? (club.productionTime / 1000) : 10}sec
                </div>
            )}
            <button
                onClick={handleBuy}
                disabled={!canAfford}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginTop: '10px',
                    backgroundColor: canAfford ? '#4CAF50' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: canAfford ? 'pointer' : 'not-allowed'
                }}
            >
                Buy
            </button>
        </div>
    )
}