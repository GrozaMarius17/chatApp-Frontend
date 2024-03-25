import { FC, ReactNode, useState } from "react";
import { User } from "../model/User"
import axios from "axios";
import { Box, Button, Card, CardActionArea, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

export type UserSelectProps = {
    allUsers: string[];
    selectedUser: string;
    setSelectedUser: (user:string) =>  void;
}

const UserSelect: FC<UserSelectProps> = ({ selectedUser,setSelectedUser,allUsers }) => {
    



    return <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
        <FormControl fullWidth>
            <Select
                value={selectedUser}
                label="user"
                onChange={(e) => setSelectedUser(e.target.value)}
                >
                    {allUsers.map(user => <MenuItem>{user}</MenuItem>)}
            </Select>
        </FormControl>
        </Card>
    </Box>
};


export default UserSelect;
