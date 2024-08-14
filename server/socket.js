import { Server as SockerIOServer } from "socket.io";
import Message from "./models/MessageModel.js";

const setUpSocket= (server) =>{
    const io = new SockerIOServer(server,{
        cors:{
            origin: process.env.ORIGIN,
            methods: ["GET","POST"],
            credentials: true
        }
    })

    const userSocketMap = new Map();
    const disconnect = (socket) =>{
        console.log(`Client Disconnected.${socket.id}`);
        for(const [userId, socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId)
                break;
            }
        }
    }
    // const sendMessage = async(message)=>{
    //     const senderSocketID = userSocketMap.get(message.sender)
    //     const recipientSocketID = userSocketMap.get(message.recipient);
    //     const createdMessage = await Message.create(message)
    //     const messageData = await Message.findById(createdMessage._id)
    //     .populate("sender","id email firstName lastName image color")
    //     .populate("recipient","id email firstName lastName image color")

    //     if(recipientSocketID){
    //         io.to(recipientSocketID).emit("receiveMessage",messageData)
    //     }
    //     if(senderSocketID){
    //         io.to(senderSocketID).emit("receiveMessage",messageData)

    //     }
    //     console.log(`Sending message to recipient: ${recipientSocketID}`);
    //     console.log(`Message data: `, messageData);
    // }
    const sendMessage = async (message) => {
        console.log("sendMessage function triggered"); // Add this log to confirm the function is running
    
        const senderSocketID = userSocketMap.get(message.sender);
        const recipientSocketID = userSocketMap.get(message.recipient);
    
        console.log(`Sender Socket ID: ${senderSocketID}`);
        console.log(`Recipient Socket ID: ${recipientSocketID}`);
    
        try {
            const createdMessage = await Message.create(message);
            const messageData = await Message.findById(createdMessage._id)
                .populate("sender", "id email firstName lastName image color")
                .populate("recipient", "id email firstName lastName image color");
    
            if (recipientSocketID) {
                io.to(recipientSocketID).emit("receiveMessage", messageData);
            }
            if (senderSocketID) {
                io.to(senderSocketID).emit("receiveMessage", messageData);
            }
            // socket.on("receiveMessage", (message) => {
            //     console.log("Message received:", message); // This should log when a message is received
            // });
            
            console.log(`Sending message to recipient: ${recipientSocketID}`);
            console.log(`Message data: `, messageData);
        } catch (error) {
            console.error("Error in sendMessage:", error);
        }
    };
    
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId,socket.id)
            console.log("User Connected: "+userId +" with socket id: "+ socket.id)
        }else{
            console.log("User Id not provided during connection")
        }
        socket.on("sendMessage",sendMessage)
        socket.on("disconnect",()=>disconnect(socket))
    })
 
}

export default setUpSocket;