import { IUser } from '.'

export interface authStateType {
    authentificated: boolean
    user: IUser | null
}
