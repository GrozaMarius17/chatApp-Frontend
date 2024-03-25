import { FC, useState } from "react";
import { Message } from "../model/Message"
import axios from "axios";
import { Box, Button, Card, CardActionArea, CardContent, TextField, Typography } from "@mui/material";

export type AddMessageFormProps = {
    closeForm: (reload: boolean) => void;
}

const AddMessageForm: FC<AddMessageFormProps> = ({ closeForm }) => {
    const [addMessage, setAddMessage] = useState<string>('');

    const saveMessage = () => {
        axios.post('http://localhost:8080/chatApp/addNewMessage', { text: addMessage }).then(() => {
            closeForm(true);
        });
    };

    return <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
                <TextField label='Message' value={addMessage} onChange={(e) => { setAddMessage(e.target.value) }}></TextField>
            </CardContent>
            <CardActionArea>
                <Button onClick={() => { saveMessage() }}>Send</Button>
                <Button onClick={() => { closeForm(false) }}>Cancel</Button>
            </CardActionArea>
        </Card>
    </Box>
};


export default AddMessageForm;