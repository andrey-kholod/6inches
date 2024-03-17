import React, { useContext, createContext } from 'react'
import { signInUser, signUpUser } from '../helpers/authHelper';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';

export type ILiteralsType = 'LOG_IN' | 'LOG_OUT' | 'SIGN_UP'

export interface UserData {
    nickname: string;
    password: string;
    status: string;
}

interface IAuthContextProvider {
    children: React.ReactNode
}

export interface IState {
    isAuthenticated: boolean
    nickname: string
    status: string
    id?: number
}

export interface IAction {
    type: ILiteralsType
    payload: {nickname: string; status: string}
}

interface IContext {
    isAuthenticated: boolean
    nickname: string
    logIn: (userData: Omit<UserData, 'status'>) => Promise<any>
    signUp: (UserData: UserData) => Promise<any>
    logOut: () => void
    // setNickname: (newName: string) => void
}


export type IReducerFunction = (state: IState, action: IAction) => IState

const AuthContext = createContext({} as IContext)

export const useAuthContext = () => {
    return useContext(AuthContext)
}


const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [state, dispatch] = useLocalStorageReducer({
        isAuthenticated: false,
        nickname: '',
        status: ''
    }, 'store')

    const logIn = async (userData: Omit<UserData, 'status'>) => {
        const response = await signInUser(userData)
        if (response.status > 300) {
            return response
        }
            dispatch({type: 'LOG_IN', payload: {nickname: userData.nickname, status: ''}})
            return response
    }

    const logOut = () => {
            dispatch({type: 'LOG_OUT', payload: {nickname: '', status: ''}})
    }

    const signUp = async (userData: UserData) => {
        const response = await signUpUser(userData)
        if (response.status > 300) {
            return response
        }
            dispatch({type: 'SIGN_UP', payload: {nickname: userData.nickname, status: userData.status}})
            return response
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, nickname: state.nickname, logIn, signUp, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider