import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Snackbar, SnackbarContent, Typography } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { initiateLogin } from '../actions/Auth'
import { validateFields } from '../utils/Common'
import { Alert } from '@material-ui/lab'
import { setErrors } from '../actions/Alert'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root1: {
        flexGrow: 1
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '50ch',
    },
}))

const Login = ({ initiateLogin, error, successMsg, setErrors, auth }) => {
    const classes = useStyles()
    const history = useHistory()

    console.log('error', error)
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        open: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const onLogin = (e) => {
        e.preventDefault()
        const { email, password } = values
        const fieldsToValidate = [{ email }, { password }]
        const allFieldsEntered = validateFields(fieldsToValidate)
        if (!allFieldsEntered) {
            // setValues({ ...values, errorMsg: { signin_error: 'Please enter all the fields' }})
            setErrors({ signin_error: 'Please enter all the fields' })
        } else {
            initiateLogin(email, password)
        }
    }
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setValues({...values, open: false})
    }
    useEffect(() => {
        if(auth.isAuthenticated){
            history.push('/profile')
        }
        if(error && error.length !== 0){
            setValues({...values, open: true})
        } else {
            setValues({...values, open: false})
        }
    }, [error, history, auth.isAuthenticated])
    
    return (
        <form onSubmit={onLogin}>
            {error && error.map(e => (
                <Snackbar key={e.id} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={values.open} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error">
                        {e.error.signin_error}
                    </Alert>
                </Snackbar>
            ))}
            <Grid  direction="column" justify="center" alignItems="center" className={classes.root1} container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={clsx(classes.margin, classes.withoutLabel)} variant='h4' component='h4'> Account Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                type='email'
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                        <Button type='submit' variant='contained' className={clsx(classes.margin, classes.textField)}> Login </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    error: state.alert.error,
    successMsg : state.alert.successMsg,
    auth: state.auth
})

export default connect(mapStateToProps, { initiateLogin, setErrors })(Login)
