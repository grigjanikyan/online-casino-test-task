import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { authStateType } from '../shared/interfaces'
import { tokenHandler, userHandler } from '../shared/utils'
import Content from './Content/Content'

import './App.css'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const initialState: authStateType = {
    authentificated: !!tokenHandler.get(),
    user: null,
}

function App() {
    const [appState, setAuthState] = useState(initialState)

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            console.log(user, 'JSON.parse(user)')
            setAuthState({
                authentificated: true,
                user: {
                    ...JSON.parse(user),
                },
            })
        }
    }, [])

    const userActionsHandler = (action: { type: string; payload?: any }) => {
        const user = localStorage.getItem('user')

        switch (action.type) {
            case 'login':
                if (user) {
                    setAuthState({
                        authentificated: true,
                        user: {
                            ...JSON.parse(user),
                        },
                    })
                }
                break
            case 'logout':
                setAuthState({
                    authentificated: false,
                    user: null,
                })
                break
            case 'spin':
                setAuthState((prev) => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        balance: prev.user?.balance + action.payload,
                    },
                }))
                userHandler.updateBalance(action.payload)
                break
            default:
                setAuthState({
                    authentificated: false,
                    user: null,
                })
        }
    }

    const isAuthentificated: boolean = appState.authentificated

    return (
        <div className="App">
            <Router>
                <Header
                    user={appState.user}
                    authentificated={isAuthentificated}
                    userActionsHandler={userActionsHandler}
                />

                <Content
                    user={appState.user}
                    authentificated={isAuthentificated}
                    userActionsHandler={userActionsHandler}
                />

                <Footer />
            </Router>
        </div>
    )
}

export default App
