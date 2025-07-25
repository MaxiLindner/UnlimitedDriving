import React from 'react'
import {doGame} from "./GameContext.tsx";
import {ClubDefinitions} from "../clubs/ClubDefinitions";

interface ClubCardProps {
    club: {
        id: number
        name: string
        cost: number
        costType: 'money' | number
        clubCost?: number
        produces: 'money' | number
        revenue?: number
        productionTime?: number
    }
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
    const { state, dispatch } = doGame()

    const owned = state.clubs[club.id]?.owned || 0
    const hasEnoughMoney = state.money >= club.cost
    const hasEnoughClubs = !club.clubCost ||
        (club.id > 1 && (state.clubs[club.id - 1]?.owned || 0) >= club.clubCost)

    const canAfford = hasEnoughMoney && hasEnoughClubs

    const handleBuy = () => {
        dispatch({ type: 'BUY_CLUB', clubId: club.id })
    }

    const getPreviousClubName = () => {
        if (club.id > 1) {
            return ClubDefinitions[club.id - 1].name
        }
        return ''
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
                Cost: ${club.cost}
                {club.clubCost && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        + {club.clubCost} {getPreviousClubName()}
                    </div>
                )}
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
            {!hasEnoughMoney && (
                <div style={{ fontSize: '10px', color: 'red', marginTop: '5px' }}>
                    Not enough money
                </div>
            )}
            {!hasEnoughClubs && club.clubCost && (
                <div style={{ fontSize: '10px', color: 'red', marginTop: '5px' }}>
                    Need {club.clubCost} {getPreviousClubName()}
                </div>
            )}
        </div>
    )
}