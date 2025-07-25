import React from 'react'
import { GameHeader } from './GameHeader'
import { ClubList } from './ClubList'
import {GameProvider} from "./GameContext.tsx";

const App: React.FC = () => {
    return (
        <GameProvider>
            <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <GameHeader />
                <ClubList />
            </div>
        </GameProvider>
    )
}

export default App