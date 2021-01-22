import 'date-fns';
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DataTable from './TransactionTable'
import { Button, makeStyles } from '@material-ui/core';

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

const Summary = () => {
    const classes = useStyles()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
                    <Button variant='contained' color='primary'>
                        Show Transaction
                    </Button>
                </Grid>
            </Grid>
            <DataTable/>
        </div>
    )
}

export default Summary
