import { v4 as uuid } from 'uuid'
import { IUser } from '../interfaces'
import { tokenHandler } from '.'
import Spade from '../../assets/img/sird.png'

function generateUsername() {
    return `Test ${String(Math.floor(100000 + Math.random() * 900000))}`
}

export default {
    /**
     * returns token if it exists
     *
     * @return {string | boolean} returns token or false if the token doesn't exist
     */
    get: () => {
        try {
            const parseData = localStorage.getItem('user')
            return parseData && JSON.parse(parseData)
        } catch (err) {
            return false
        }
    },
    /**
     * set token if it exists
     *
     */
    set: (user: IUser) => {
        const token: string = uuid()
        const newUser: IUser = {
            ...user,
            username: generateUsername(),
            id: String(uuid()),
            created_at: new Date(),
            balance: 99,
            token,
        }
        tokenHandler.set(token)
        localStorage.setItem('user', JSON.stringify(newUser))
    },

    /**
     * removes token
     *
     */
    updateBalance: (balance: number) => {
        const parseData = localStorage.getItem('user')
        const updatedUser = parseData && JSON.parse(parseData)
        localStorage.setItem(
            'user',
            JSON.stringify({
                ...updatedUser,
                balance: updatedUser?.balance + balance,
            })
        )
    },

    /**
     * removes token
     *
     */
    addGameHistory: (payload: {
        cards: string[]
        result: string
        coin: number
    }) => {
        const parseData = localStorage.getItem('history')
        const historyData = (parseData !== null && JSON.parse(parseData)) || []

        console.log(historyData, 'historyData')

        localStorage.setItem(
            'history',
            JSON.stringify([...historyData, payload])
        )
    },
    /**
     * removes token
     *
     */
    remove: () => {
        localStorage.removeItem('user')
    },
    /**
     * clear entire lovalStorage
     *
     */
    removeAll: () => {
        localStorage.clear()
    },
}
