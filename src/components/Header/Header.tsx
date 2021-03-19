import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

import { IHeader } from '../../shared/interfaces'
import { userHandler, tokenHandler } from '../../shared/utils'

import './header.scss'
import Login from '../Auth/Login'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        balanceContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
)

function Header(props: IHeader) {
    const { authentificated, user, userActionsHandler } = props

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const isMenuOpen = Boolean(anchorEl)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogout = () => {
        userHandler.remove()
        tokenHandler.remove()
        handleMenuClose()
        userActionsHandler({type: 'logout'})
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>logout</MenuItem>
        </Menu>
    )

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <Link to="/">Logo</Link>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Welcome to the
                    </Typography>
                    {authentificated ? (
                        <div className={classes.balanceContainer}>
                            <span>${user?.balance}</span>
                            <AccountBalanceWalletIcon />
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    ) : (
                        <Login userActionsHandler={userActionsHandler} />
                    )}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

export default Header
