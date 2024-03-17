
import { Dispatch, useEffect, useReducer } from "react";
import { IAction, IReducerFunction, IState } from "../context/AuthContext";



export const useLocalStorageReducer = (initialValue: IState, key: string): [IState, Dispatch<IAction>] => {
    
function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, nickname: action.payload.nickname, isAuthenticated: true }
        case 'LOG_OUT':
            return { isAuthenticated: false, nickname: '', status: '' }
        case 'SIGN_UP':
                return { nickname: action.payload?.nickname , isAuthenticated: true, status: action.payload?.status  }
        default:
            return state
    };
    
}

    const getItem = () => {
        const store = localStorage.getItem(key)
        return store ? JSON.parse(store) : initialValue
    }

    const [storeValue, dispatch] = useReducer<IReducerFunction>(reducer, getItem())

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storeValue))
    }, [storeValue])


    return [storeValue, dispatch]
}