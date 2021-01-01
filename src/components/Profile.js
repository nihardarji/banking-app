import { Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, Input, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from '../actions/Profile'

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    root1: {
        margin: 'auto',
        // marginTop: '15px',
        maxWidth: 700
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      margin: '1% 0'
    },
    text: {
        fontSize: 14,
        margin: '1% 0'
    },
    pos: {
      marginBottom: 12,
    },
    profile:{
        margin: '4% 0' 
    },
    marginLeft:{
        marginLeft: 'auto'
    },
    marginX: {
        marginTop: '1%',
        marginBottom: '1%',
        margin: 'auto'
    }
}))

const Profile = ({ profile, updateProfile }) => {
    const classes = useStyles()
    const { profileInfo } = profile
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        name: null,
        email: null
    })

    useEffect(() => {
        setValues({...values, name: profileInfo && profileInfo.name, email: profileInfo && profileInfo.email})
    }, [profileInfo])

    const handleClose = () => {
        setOpen(false)
        setValues({...values, email: profileInfo && profileInfo.email, name: profileInfo && profileInfo.name})
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateProfile(values)
        handleClose()
    }

    return (
        <div>
            <Container className={classes.root1}>
                <Box display='flex' justifyContent='center' className={classes.profile}>
                    <Typography component='h4' variant='h4'>
                        Profile
                    </Typography>
                </Box>
                <Card className={classes.root} variant="outlined">
                    { profileInfo && <CardContent>
                        <Box display='flex' justifyContent='flex-end'>
                            <IconButton onClick={() => setOpen(true)}>
                                <Edit/>
                            </IconButton>
                        </Box>
                        <Typography className={classes.title}>
                            Full Name
                        </Typography>
                        <Typography className={classes.text}>
                            {profileInfo.name}
                        </Typography>
                        <Divider/>
                        <Typography className={classes.title}>
                            Email Id
                        </Typography>
                        <Typography className={classes.text}>
                            {profileInfo.email}
                        </Typography>
                        {/* <Divider/> */}
                    </CardContent>}
                    {/* <CardActions>
                        <Button className={classes.marginLeft} size="small">Change Password</Button>
                    </CardActions> */}
                </Card>
                <Dialog
                    fullWidth
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={onSubmit}>
                        <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormControl fullWidth className={classes.marginX}>
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input
                                        id="name"
                                        type='text'
                                        // defaultValue={profileInfo && profileInfo.name}
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        required
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.marginX}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        id="email"
                                        type='email'
                                        // defaultValue={profileInfo && profileInfo.email}
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        required
                                    />
                                </FormControl>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type='submit' color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>  
            </Container>  
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { updateProfile })(Profile)
