import React, { useState, useEffect } from 'react'
import Club from '../../assets/img/Club.png'
import Heart from '../../assets/img/Heart.png'
import Spade from '../../assets/img/Spade.png'
import Diamond from '../../assets/img/Diamond.png'
import Game from '../Game/Game'
import Button from '@material-ui/core/Button'

import { IContent } from '../../shared/interfaces/content'

import './content.scss'

const Content = (props: IContent) => {
    const { authentificated, user, userActionsHandler } = props

    const [startGame, setStartGame] = useState(false)
    const [coints, setCoinst] = useState(99)

    const [history, setHistory] = useState([
        {
            cards: [Spade, Spade, Spade],
            result: '',
            coin: 0,
        },
    ])

    useEffect(() => {
        const historyData: any = localStorage.getItem('history')
        if (historyData) {
            setHistory(JSON.parse(historyData))
        }
    }, [])

    return authentificated ? (
        <div className="content-container">
            <Button
                variant="contained"
                color="primary"
                onClick={() => setStartGame(true)}
            >
                Start Game
            </Button>

            {startGame && (
                <Game
                    setStartGame={setStartGame}
                    setCoinst={setCoinst}
                    coints={coints}
                    history={history}
                    setHistory={setHistory}
                    userActionsHandler={userActionsHandler}
                />
            )}

            {history.map((e: any, index: number) => {
                if (index <= 10) {
                    return (
                        <p>
                            {e.cards.map((card: string) => {
                                return (
                                    <>
                                        <img
                                            src={card}
                                            width="20"
                                            height="20"
                                        />
                                        &nbsp;
                                    </>
                                )
                            })}
                            <span>{e.result}</span>&nbsp;
                            <span>{e.coin}$</span>
                        </p>
                    )
                }
            })}
        </div>
    ) : (
        <div></div>
    )
}

export default Content
