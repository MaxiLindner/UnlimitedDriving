import React from "react";

interface TabNavigationProps {
    activeTab: 'clubs' | 'upgrades';
    setActiveTab: (tab: 'clubs' | 'upgrades') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
    const tabStyle = (isActive: boolean) => ({
        padding: '12px 24px',
        marginRight: '10px',
        backgroundColor: isActive ? '#4CAF50' : '#e0e0e0',
        color: isActive ? 'white' : '#333',
        border: 'none',
        borderRadius: '8px 8px 0 0',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: isActive ? 'bold' : 'normal',
        boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s ease',
        position: 'relative' as const,
        zIndex: isActive ? 2 : 1
    })

    const upgradeTabStyle = (isActive: boolean) => ({
        ...tabStyle(isActive),
        backgroundColor: isActive ? '#2196F3' : '#e0e0e0',
    })

    return (
        <div style={{
            marginBottom: '0',
            borderBottom: '2px solid #ddd',
            position: 'relative'
        }}>
            <button
                onClick={() => setActiveTab('clubs')}
                style={tabStyle(activeTab === 'clubs')}
                onMouseOver={(e) => {
                    if (activeTab !== 'clubs') {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5'
                    }
                }}
                onMouseOut={(e) => {
                    if (activeTab !== 'clubs') {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#e0e0e0'
                    }
                }}
            >
                🏌️ Golf Clubs
            </button>
            <button
                onClick={() => setActiveTab('upgrades')}
                style={upgradeTabStyle(activeTab === 'upgrades')}
                onMouseOver={(e) => {
                    if (activeTab !== 'upgrades') {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5'
                    }
                }}
                onMouseOut={(e) => {
                    if (activeTab !== 'upgrades') {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#e0e0e0'
                    }
                }}
            >
                ⭐ Upgrades
            </button>
        </div>
    )
}