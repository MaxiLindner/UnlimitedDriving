import {ClubDefinitions} from '../clubs/ClubDefinitions'
import {type GameAction, GameReducer, type GameState} from "../game/GameReducer.ts";
import {initialState} from "../store/InitialState.ts";
import {useGameEngine} from "../game/UseGameEngine.ts";
import React, {createContext, useContext, useEffect, useReducer} from "react";

interface GameContextType {
    state: GameState
    dispatch: React.Dispatch<GameAction>
    clubDefinitions: typeof ClubDefinitions
}

const STORAGE_KEY = 'golf-game-states';

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const loadInitialState = (): GameState => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (error) {
                console.error('Error while loading the state:', error);
                return initialState;
            }
        }
        return initialState;
    };

    const [state, dispatch] = useReducer(GameReducer, loadInitialState());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    useGameEngine(dispatch, state)

    return (
        <GameContext.Provider value={{state, dispatch, clubDefinitions: ClubDefinitions}}>
            {children}
        </GameContext.Provider>
    )
}

const doGame = (): GameContextType => {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}

export { doGame }