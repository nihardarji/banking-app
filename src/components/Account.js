import React, { useState } from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import AccountForm from './AccountForm';
import Summary from './Summary';

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

const Account = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
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

export default Account
