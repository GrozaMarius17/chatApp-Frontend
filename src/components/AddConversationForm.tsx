import { FC, useState } from "react";
import { Conversation } from "../model/Conversation"
import axios from "axios";
import { Box, Button, Card, CardActionArea, CardContent, TextField, Typography } from "@mui/material";
import { User } from "../model/User";

export type AddConversationFormProps = {
    closeForm: (reload: boolean) => void;
    userFrom:string;
    userTo:string;
}

const AddConversationForm: FC<AddConversationFormProps> = ({ closeForm,userFrom,userTo }) => {
    const [message, setMessage] = useState<string>("");

    const saveConversation = () => {
        axios.post('http://localhost:8080/conversations', {
               userFrom:{name:userFrom},
               userTo:{name:userTo},
               message:{text:message}
             }).then(() => {
            closeForm(true);
        });
    };

    return <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
                <TextField label='message' value={message} onChange={(e) => { setMessage(e.target.value)}}></TextField>
            </CardContent>
            <CardActionArea>
                <Button onClick={() => { saveConversation() }}>Send</Button>
                <Button onClick={() => { closeForm(false) }}>Cancel</Button>
            </CardActionArea>
        </Card>
    </Box>
};


export default AddConversationForm;