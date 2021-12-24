import React, { useEffect, useState } from 'react';
import { Button, Container, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const ManageBikes = () => {
    const [bikes, setBikes] = useState([]);
    useEffect(() => {
        fetch('https://pacific-oasis-02900.herokuapp.com/bikes')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [])

    // deleting order
    const handleDelete = (_id) => {
        const confirm = window.confirm('Do you want to delete?')
        if (confirm) {
            const url = `https://pacific-oasis-02900.herokuapp.com/bikes/${_id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted seccessfully');
                        const remainingOrders = bikes.filter(order => order._id !== _id)
                        setBikes(remainingOrders);
                    }
                })
        }
    }
    return (
        <Container>
            <h2>Manage all Bikes here</h2>
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"> <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Bike Picture</Typography> </TableCell>
                                <TableCell align="center"> <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Bike Name</Typography> </TableCell>
                                <TableCell align="center"> <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ratings</Typography> </TableCell>
                                <TableCell align="center"> <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Delete Bike</Typography> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bikes.map((row) => {
                                const { _id, picture, name, rating } = row;
                                return (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            <img src={picture} style={{ width: '200px' }} alt="" />
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Rating name="read-only" value={rating} readOnly />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                sx={{ background: 'red' }}
                                                onClick={() => handleDelete(_id)}
                                            >Delete Bike</Button>
                                        </TableCell>
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ManageBikes;