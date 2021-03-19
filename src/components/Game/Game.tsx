import React, { useEffect, useState } from 'react'
import Club from '../../assets/img/Club.png'
import Heart from '../../assets/img/Heart.png'
import Spade from '../../assets/img/Spade.png'
import Diamond from '../../assets/img/Diamond.png'

import { userHandler } from '../../shared/utils'

import './style.css'

const Game = (props: any) => {
    const { userActionsHandler, setCoinst } = props
    const [cards, setCards] = useState<any>(props.history[0].cards)

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    const getCards = (number: number) => {
        switch (number) {
            case 0:
                return Club
            case 1:
                return Spade
            case 2:
                return Diamond
            case 3:
                return Heart
        }
    }

    const setHistoryAndResult = (
        card: string,
        result: string,
        coin: number
    ) => {
        props.setHistory([
            {
                cards: [card[0], card[1], card[2]],
                result: result,
                coin: coin,
            },
            ...props.history,
        ])

        userHandler.addGameHistory({
            cards: [card[0], card[1], card[2]],
            result: result,
            coin: coin,
        })
    }

    const check = (array?: any) => {
        let result = 0
        const jackpot = array.filter((e: any) => {
            return e === Spade
        })
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] === array[j] && i != j) {
                    result++
                }
            }
        }

        if (result === 2) {
            result = 0.5
        } else if (result === 6) {
            result = 2
        } else {
            result = -1
        }

        if (jackpot.length === 3) {
            result = 5
        }

        setHistoryAndResult(array, ' - WIN: ', result)
        setCoinst(props.coints + result)

        return result
    }

    const spinRoulet = () => {
        const randomCards: any = []
        cards.forEach(() => {
            randomCards.push(getCards(getRandomInt(4)))
        })

        setCards(randomCards)
        const result = check(randomCards)
        userActionsHandler({ type: 'spin', payload: result })
    }

    const jackPot = () => {
        const spades = [Spade, Spade, Spade]
        setCards(spades)
        const result = check(spades)
        userActionsHandler({ type: 'spin', payload: result })
    }

    return (
        <div className="game_board">
            {cards.map((e: any) => {
                return (
                    <div className="cards">
                        <img src={e} width="100" height="100" />
                    </div>
                )
            })}
            <button className="playButton" onClick={() => spinRoulet()}>
                Spin
            </button>
            <button className="playButton" onClick={() => jackPot()}>
                JackPot
            </button>
            <button
                onClick={() => {
                    props.setStartGame()
                }}
            >
                Close
            </button>
        </div>
    )
}

export default Game
