import React, {useState} from "react";
import {TabNavigation} from "./tabs/TabNagivation.tsx";
import {TabContent} from "./tabs/TabContent.tsx";
import {GameHeader} from "./GameHeader.tsx";

export const GameContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'clubs' | 'upgrades'>('clubs')

    return (
        <div style={{
            width: '100vw',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            boxSizing: 'border-box',
            margin: '0',
            position: 'absolute',
            left: '0',
            top: '0'
        }}>
            <GameHeader />

            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '90%',
                margin: '0 auto'
            }}>
                <TabNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabContent activeTab={activeTab} />
            </div>
        </div>
    )
}