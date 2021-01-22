import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Container, FormControl, Input, InputAdornment, InputLabel, makeStyles, OutlinedInput, Typography } from '@material-ui/core'
import AddAccountForm from './AddAccountForm'
import { connect } from 'react-redux'
import { maskNumber } from '../utils/mask'
import { depositAmount, withdrawAmount } from '../actions/transactionAction'

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

const AccountForm = ({ type, account, withdrawAmount, depositAmount }) => {
    const classes = useStyles()
    const [amount, setAmount] = useState(null)
    const accountNo = account.account_no ? maskNumber(account.account_no) : ''


    const onSubmit = (e) => {
        e.preventDefault()
        type === 'Deposit' ? depositAmount(account._id, Number(amount)) : withdrawAmount(account._id, Number(amount))
        setAmount('')
    }
    return (
        <Container>
            { accountNo ? 
            <Card className={classes.root} variant="outlined">
                <form onSubmit={onSubmit}>
                    <CardContent>
                        <Typography className={classes.title} gutterBottom>
                            {type}
                        </Typography>
                        <Typography className={classes.pos}>
                            Account Number: { accountNo }
                        </Typography>
                        <Typography className={classes.pos}>
                            Available Balance: {account.total_balance}
                        </Typography>
                        <Typography className={classes.margin}>
                        <FormControl className={classes.margin1} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    size='small'
                                    id="outlined-adornment-amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={60}
                                    style={{width: '50vw'}}
                                    placeholder={`Enter the amount to ` + type }
                                    required
                                />
                            </FormControl>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' color='primary' variant='contained'>Submit</Button>
                    </CardActions>
                </form>
            </Card> :
            <AddAccountForm/> }
        </Container>
    )
}

const mapStateToProps = state => ({
    account: state.account
})

export default connect(mapStateToProps, { depositAmount, withdrawAmount })(AccountForm)