import {GameProvider} from "./GameContext.tsx";
import React from "react";
import {GameContent} from "./GameContent.tsx";


const App: React.FC = () => {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    )
}

export default App