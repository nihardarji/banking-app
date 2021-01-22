import 'date-fns';
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getTransactions } from '../actions/transactionAction';
import TransactionTable from './TransactionTable';

function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
        return Date.parse(date) < startSeconds;
    }
}

const useStyles = makeStyles({
    margin: {
        marginBottom: 10
    }
})

const Summary = ({ getTransactions, account }) => {
    const classes = useStyles()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if(account._id){
            getTransactions(account._id)
        }
    }, [account])

    const onFilter = (event) => {
        event.preventDefault()
        getTransactions(account._id, startDate, endDate)
    }
    return (
        <div>
            <Grid className={classes.margin} container justify='center' alignItems='center' spacing={2}>
                <Grid item xs={4} alignContent='center'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            variant="inline"
                            autoOk={true}
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="start-date"
                            label="Start Date"
                            value={startDate}
                            maxDate={new Date()}
                            onChange={date => setStartDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            variant="inline"
                            autoOk={true}
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="end-date"
                            label="End Date"
                            value={endDate}
                            maxDate={new Date()}
                            shouldDisableDate={disablePrevDates(startDate)}
                            onChange={date => setEndDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' onClick={onFilter} color='primary'>
                        Filter
                    </Button>
                </Grid>
            </Grid>
            <TransactionTable/>
        </div>
    )
}

const mapStateToProps = state => ({
    account: state.account,
})

export default connect(mapStateToProps, { getTransactions })(Summary)
