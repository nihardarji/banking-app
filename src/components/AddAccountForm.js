import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, FormControl, Input, InputAdornment, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { addAccountDetails } from '../actions/accountActions'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
        marginTop: 12,
    },
    margin: {
        marginTop: 18,
        marginBottom: 18
    },
    margin1: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))


const AddAccountForm = ({ addAccountDetails }) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        accountNo: null,
        bankName: null,
        ifsc: null
    })

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
    }
    const addAccount = async (e) => {
        e.preventDefault()
        await addAccountDetails(values.accountNo, values.bankName, values.ifsc)
    }
    return (
        <Card className={classes.root} variant="outlined">
            <form onSubmit={addAccount}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        Add Account
                    </Typography>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="acc-no">Account Number</InputLabel>
                        <Input
                            id="acc-no"
                            value={values.accountNo}
                            onChange={handleChange('accountNo')}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="bank-name">Bank Name</InputLabel>
                        <Input
                            id="bank-name"
                            value={values.bankName}
                            onChange={handleChange('bankName')}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="ifsc-code">IFSC Code</InputLabel>
                        <Input
                            id="ifsc-code"
                            value={values.ifsc}
                            onChange={handleChange('ifsc')}
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button type='submit' color='primary' variant='contained'>Submit</Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default connect(null, { addAccountDetails })(AddAccountForm)
