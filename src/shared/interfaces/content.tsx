import { IUser } from '.'

export interface IContent {
    authentificated: boolean
    user: IUser | null
    userActionsHandler: (action: {type: string, payload?: string | number}) => void
}
