import React, { useState } from 'react'
import axios from 'axios'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import ApiUrl from './apiConfig'

export function AddUser () {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [sleepTimeDuration, setSleepTimeDuration] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !gender || !sleepTimeDuration) {
      setErrorMessage('Please fill out all fields')
      return
    }
    if (sleepTimeDuration <= 0 || sleepTimeDuration > 24) {
      setErrorMessage('Please enter valid sleep duration')
      return
    }
    try {
      await axios.post(`${ApiUrl}/api/addUser`, {name, gender, sleepTimeDuration})
      // alert('User added successfully')
      setErrorMessage('')
      setConfirmationMessage('User added successfully')
    } catch (error) {
      setErrorMessage('Error adding user')
      
    }
  }
  
  return (
    <div style={{width: '50%', margin: '0 auto'}}>
      <Typography variant="h5">Add User</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Sleep Time Duration"
              variant="outlined"
              fullWidth
              value={sleepTimeDuration}
              onChange={(e) => setSleepTimeDuration(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {errorMessage && <Typography style={{color: 'red'}}>{errorMessage}</Typography>}
          </Grid>
          <Grid item xs={12}>
            {confirmationMessage && <Typography style={{color: 'green'}}>{confirmationMessage}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}