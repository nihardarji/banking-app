import React, { useEffect, useState } from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import AccountForm from './AccountForm';
import Summary from './Summary';
import { connect } from 'react-redux';
import { getAccountDetails } from '../actions/accountActions';

function TabPanel(props) {
    const { children, value, index, ...other } = props
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

const Account = ({ userInfo, getAccountDetails }) => {
    const [value, setValue] = useState(0);
    const { email } = userInfo

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if(email){
            getAccountDetails()
        }
    }, [email])
    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    <Tab label="Summary" {...a11yProps(0)} />
                    <Tab label="Withdraw" {...a11yProps(1)} />
                    <Tab label="Deposit" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Summary/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AccountForm type='Withdraw'/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AccountForm type='Deposit'/>
            </TabPanel>

        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.auth.userInfo
})

export default connect(mapStateToProps, { getAccountDetails })(Account)
