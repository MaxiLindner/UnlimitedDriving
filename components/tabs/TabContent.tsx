import {ClubList} from "./clubs/ClubList.tsx";
import {UpgradeMenu} from "./upgrades/UpgradeMenu.tsx";
import React from "react";

interface TabContentProps {
    activeTab: 'clubs' | 'upgrades';
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
    const contentStyle: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '0 8px 8px 8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '500px',
        border: '3px solid #ddd',
        borderTop: 'none',
        width: '100%',
        boxSizing: 'border-box'
    }

    const containerStyle: React.CSSProperties = {
        marginTop: '20px',
        padding: '15px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        minHeight: '400px',
        width: '100%',
        boxSizing: 'border-box'
    }

    const wrapperStyle: React.CSSProperties = {
        width: '100%'
    }

    return (
        <div style={contentStyle}>
            {activeTab === 'clubs' && (
                <div style={wrapperStyle}>
                    <div style={containerStyle}>
                        <ClubList />
                    </div>
                </div>
            )}
            {activeTab === 'upgrades' && (
                <div style={wrapperStyle}>
                    <div style={containerStyle}>
                        <UpgradeMenu />
                    </div>
                </div>
            )}
        </div>
    )
}