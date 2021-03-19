import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support

import { permisson } from '../../shared/constants'
import { userHandler, CopyToClipboard } from '../../shared/utils'

import './login.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: '500px',
        },
        card: {
            minWidth: 275,
        },
        permisson: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px 0',
        },
    })
)

interface FadeProps {
    children?: React.ReactElement
    in: boolean
    onEnter?: () => {}
    onExited?: () => {}
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
    props,
    ref
) {
    const { in: open, children, onEnter, onExited, ...other } = props
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter()
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited()
            }
        },
    })

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    )
})

export interface ILoginForm {
    email: any
    password: any
}

const Login = (props: { userActionsHandler: (action: {type: string, payload?: string | number}) => void }) => {
    const { userActionsHandler } = props
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const [loginForm, setLoginForm] = React.useState<ILoginForm>({
        email: '',
        password: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        const {
            email,
            password,
        }: { email: string; password: string } = loginForm

        if (!email || !password) {
            alert('Please fill fields')
            return
        } else {
            if (permisson.email !== email || permisson.password !== password) {
                alert('Incorrect email or password.')
                return
            }
        }

        userHandler.set({ email, password })
        userActionsHandler({type: 'login'})
        handleClose()
    }

    const { email, password }: { email?: string; password?: string } = loginForm

    return (
        <div className="login-container">
            <button type="button" onClick={handleOpen}>
                Login
            </button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="spring-modal-title">Login</h2>
                        <div className="spring-modal-content">
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        className={classes.permisson}
                                    >
                                        login: {permisson.email}
                                        &nbsp;&nbsp;&nbsp;
                                        <CopyToClipboard>
                                            {({ copy }) => (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        copy(permisson.email)
                                                    }
                                                >
                                                    Copy
                                                </Button>
                                            )}
                                        </CopyToClipboard>
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        className={classes.permisson}
                                    >
                                        pass: {permisson.password}
                                        &nbsp;&nbsp;&nbsp;
                                        <CopyToClipboard>
                                            {({ copy }) => (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        copy(permisson.password)
                                                    }
                                                >
                                                    Copy
                                                </Button>
                                            )}
                                        </CopyToClipboard>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Email"
                                multiline
                                rowsMax={4}
                                value={email}
                                name="email"
                                onChange={handleChange}
                            />
                            <TextField
                                id="standard-multiline-flexible"
                                label="password"
                                multiline
                                rowsMax={4}
                                value={password}
                                name="password"
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                login
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Login
