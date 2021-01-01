import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, makeStyles, Snackbar, Typography } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx'
import { registerUser } from '../actions/Auth'
import { connect } from 'react-redux'
import { validateFields } from '../utils/Common'
import { setErrors } from '../actions/Alert'
import { Alert } from '@material-ui/lab'
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

const Register = ({ registerUser, setErrors, error, successMsg, auth }) => {
    const classes = useStyles()
    const history = useHistory()
    const { isAuthenticated } = auth
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        showPassword: false,
        cShowPassword: false,
        open: false,
        openSuccess: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowPassword = (type) => {
        setValues({ ...values, [type]: !values[type] })
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setValues({...values, open: false})
        setValues({...values, openSuccess: false})
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, cpassword } = values
        const fieldsToValidate = [
            { name },
            { email },
            { password },
            { cpassword }
        ]
        const allFieldsEntered = validateFields(fieldsToValidate)
        if (!allFieldsEntered) {
            setErrors({ signup_error: 'Please enter all the fields' })
        } else {
            if (password !== cpassword) {
                setErrors({ signup_error: 'Password and Confirm password does not match' })
            } else {
                const register = await registerUser({ name, email, password })
            }
        }
    }

    useEffect(() => {
        if(auth.isAuthenticated){
            history.push('/profile')
        }
        if(error && error.length !== 0){
            console.log('if error')
            setValues({...values, open: true})
        } else if(successMsg && successMsg.length !== 0){
            console.log('if succcc')
            setValues({...values, openSuccess: true})
        } else {
            console.log('if not')
            setValues({...values, open: false})
            setValues({...values, openSuccess: false})
        }
    }, [error, successMsg, auth.isAuthenticated, history])
    return (
        <form onSubmit={onFormSubmit}>
            {error && values.open && error.map(e => (
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} open={values.open} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error">
                        {e.error.signup_error}
                    </Alert>
                </Snackbar>
            ))}
            {successMsg && values.openSuccess && successMsg.map(s => (
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} open={values.openSuccess} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="success">
                        {s.successMsg}
                    </Alert>
                </Snackbar>
            ))
            }
            <Grid  direction="column" justify="center" alignItems="center" className={classes.root1} container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={clsx(classes.margin, classes.withoutLabel)} variant='h4' component='h4'> Account Register</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                type='text'
                                value={values.name}
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                    </Box>
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
                                    onClick={() => handleClickShowPassword('showPassword')}
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
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
                            <Input
                                id="cpassword"
                                type={values.cShowPassword ? 'text' : 'password'}
                                value={values.cpassword}
                                onChange={handleChange('cpassword')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('cShowPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.cShowPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                        <Button type='submit' variant='contained' className={clsx(classes.margin, classes.textField)}> Register </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    error: state.alert.error,
    successMsg: state.alert.successMsg,
    auth: state.auth
})

export default connect(mapStateToProps, { registerUser, setErrors })(Register)
