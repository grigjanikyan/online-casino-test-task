import { IUser } from '.'

export interface IHeader {
    authentificated: boolean
    user: IUser | null
    userActionsHandler: (action: {type: string, payload?: string | number}) => void
}
