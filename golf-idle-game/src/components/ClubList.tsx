import React from 'react'
import {doGame} from "./GameContext.tsx";
import {ClubCard} from "./ClubCard.tsx";

export const ClubList: React.FC = () => {
    const { clubDefinitions } = doGame()

    return (
        <div className="ClubList" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {Object.values(clubDefinitions).map(club => (
                <ClubCard key={club.id} club={club} />
            ))}
        </div>
    )
}