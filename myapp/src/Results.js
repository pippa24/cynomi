import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import ApiUrl from './apiConfig';

function Results() {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sleepTimeData, setSleepTimeData] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`${ApiUrl}/api/users`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    const fetchSleepTimeData = async (userName) => {
        try {
            const response = await axios.get(`${ApiUrl}/api/sleepTimeData/${userName}`);
            setSleepTimeData(response.data);
        } catch (error) {
            console.error('Error fetching sleep time data:', error);
        }
    };

    const handleRowClick = (userName) => {
        setSelectedUser(userName);
        fetchSleepTimeData(userName);
    };


    return (
        <div style={{ width: '90%', margin: '0 auto' }}>
            <Typography variant="h5">User Data</Typography>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Number of Submissions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.map((user, index) => (
                            <TableRow key={index} onClick={() => handleRowClick(user.name)} style={{ cursor: 'pointer' }}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br/>
            <div>
                <Typography variant="h6">{selectedUser ? `Sleep Time Data for User: ${selectedUser}` : 'Select a user from the table'}</Typography>
                <ReactECharts
                    option={{
                        xAxis: {
                            type: 'category',
                            data: sleepTimeData.map((entry) => entry.date),
                        },
                        yAxis: {
                            type: 'value',
                        },
                        series: [{
                            data: sleepTimeData.map((entry) => entry.sleep_time_duration),
                            type: 'bar',
                        }],
                    }}
                />
            </div>
        </div>
    );
}

export default Results;
