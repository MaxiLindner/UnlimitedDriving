import React from 'react'
import { ClubDefinitions } from '../clubs/ClubDefinitions'
import type {GameAction, GameState} from "./GameReducer.ts";

export class GameEngine {
    private dispatch: React.Dispatch<GameAction>
    private getState: () => GameState
    private intervals: number[] = []

    constructor(dispatch: React.Dispatch<GameAction>, getState: () => GameState) {
        this.dispatch = dispatch
        this.getState = getState
    }

    start(): void {
        this.stop()

        const moneyInterval = setInterval(() => {
            this.getState();
            this.dispatch({ type: 'ADD_MONEY' })
        }, 1000)

        const clubProductionIntervals: number[] = []
        for (let clubId = 2; clubId <= 14; clubId++) {
            const club = ClubDefinitions[clubId]
            if (club && club.productionTime) {
                const interval = setInterval(() => {
                    const currentState = this.getState()
                    const ownedCount = currentState.clubs[clubId].owned
                    if (ownedCount > 0) {
                        this.dispatch({
                            type: 'ADD_CLUBS',
                            clubId: club.produces as number,
                            amount: ownedCount
                        })
                    }
                }, club.productionTime)
                clubProductionIntervals.push(interval)
            }
        }

        this.intervals = [moneyInterval, ...clubProductionIntervals]
    }

    stop(): void {
        this.intervals.forEach(interval => clearInterval(interval))
        this.intervals = []
    }
}
