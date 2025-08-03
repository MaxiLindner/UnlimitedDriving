import type {UpgradeDefinition} from "../../../upgrades/UpgradeDefinitions.ts";
import React from "react";
import {doGame} from "../../GameContext.tsx";

interface UpgradeCardProps {
    upgrade: UpgradeDefinition;
}

export const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade }) => {
    const { state, dispatch } = doGame()

    const currentLevel = state.upgrades[upgrade.id]?.level || 0
    const isMaxLevel = currentLevel >= upgrade.maxLevel
    const upgradeCost = upgrade.cost * Math.pow(2, currentLevel) // Exponential cost scaling
    const canAfford = state.money >= upgradeCost && !isMaxLevel

    const handleBuy = () => {
        dispatch({ type: 'BUY_UPGRADE', upgradeId: upgrade.id })
    }

    const getEffectDescription = () => {
        switch (upgrade.effect.type) {
            case 'production_multiplier':
                if (upgrade.effect.target === 'all') {
                    return `${upgrade.effect.value}x production multiplier (all clubs)`
                } else if (typeof upgrade.effect.target === 'number') {
                    return `${upgrade.effect.value}x production multiplier (Club ${upgrade.effect.target})`
                }
                break
            case 'speed_multiplier':
                return `${((upgrade.effect.value - 1) * 100).toFixed(0)}% speed increase`
            case 'money_bonus':
                return `+$${upgrade.effect.value}/sec flat bonus`
            default:
                return upgrade.description
        }
        return upgrade.description
    }

    const cardStyle: React.CSSProperties = {
        border: '2px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        width: '250px',
        minWidth: '250px',
        maxWidth: '280px',
        backgroundColor: isMaxLevel ? '#fff3cd' : canAfford ? '#f0f8f0' : '#f8f8f8',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const buttonStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        backgroundColor: isMaxLevel ? '#ffc107' : canAfford ? '#2196F3' : '#ccc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: canAfford ? 'pointer' : 'not-allowed',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease'
    }

    return (
        <div style={cardStyle}>
            <div>
                <h3 style={{
                    color: '#1976d2',
                    margin: '0 0 10px 0',
                    textAlign: 'center'
                }}>
                    {upgrade.name}
                </h3>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: '8px 0',
                    lineHeight: '1.4'
                }}>
                    {upgrade.description}
                </p>

                <div style={{
                    fontSize: '12px',
                    color: '#888',
                    margin: '8px 0',
                    fontStyle: 'italic'
                }}>
                    Effect: {getEffectDescription()}
                </div>

                <div style={{
                    margin: '8px 0',
                    fontWeight: 'bold'
                }}>
                    Level: {currentLevel}/{upgrade.maxLevel}
                </div>

                {!isMaxLevel && (
                    <div style={{ margin: '8px 0' }}>
                        Cost: ${upgradeCost.toLocaleString()}
                    </div>
                )}

                {currentLevel > 0 && (
                    <div style={{
                        fontSize: '12px',
                        color: '#2e7d32',
                        margin: '8px 0',
                        fontWeight: 'bold'
                    }}>
                        Current Bonus: Level {currentLevel}
                    </div>
                )}
            </div>

            <button
                onClick={handleBuy}
                disabled={!canAfford}
                style={buttonStyle}
                onMouseOver={(e) => {
                    if (canAfford && !isMaxLevel) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#1976d2'
                    }
                }}
                onMouseOut={(e) => {
                    if (canAfford && !isMaxLevel) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#2196F3'
                    }
                }}
            >
                {isMaxLevel ? 'MAX LEVEL' : canAfford ? 'Upgrade' : 'Can\'t Afford'}
            </button>

            {!canAfford && !isMaxLevel && (
                <div style={{
                    fontSize: '10px',
                    color: 'red',
                    marginTop: '5px',
                    textAlign: 'center'
                }}>
                    Need ${(upgradeCost - state.money).toLocaleString()} more
                </div>
            )}
        </div>
    )
}