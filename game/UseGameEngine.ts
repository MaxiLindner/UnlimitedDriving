import React, { useEffect, useRef } from 'react'
import { GameEngine } from './GameEngine.ts'
import type {GameAction, GameState} from "./GameReducer.ts";

export const useGameEngine = (dispatch: React.Dispatch<GameAction>, state: GameState) => {
    const engineRef = useRef<GameEngine | null>(null)
    const stateRef = useRef<GameState>(state)

    stateRef.current = state

    useEffect(() => {
        const getState = () => stateRef.current
        engineRef.current = new GameEngine(dispatch, getState)
        engineRef.current.start()

        return () => {
            if (engineRef.current) {
                engineRef.current.stop()
            }
        }
    }, [dispatch])
}