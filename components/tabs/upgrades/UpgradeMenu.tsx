import {UpgradeDefinitions} from "../../../upgrades/UpgradeDefinitions.ts";
import {UpgradeCard} from "./UpgradeCard.tsx";
import React from "react";

export const UpgradeMenu: React.FC = () => {

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
        }}>
            {Object.values(UpgradeDefinitions).map(upgrade => (
                <UpgradeCard key={upgrade.id} upgrade={upgrade}/>
            ))}
        </div>
    )
}