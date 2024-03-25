import { Message } from "./Message";
import { User } from "./User";

export type Conversation = {
    userFrom: User
    userTo: User
    message: Message
}

export {};