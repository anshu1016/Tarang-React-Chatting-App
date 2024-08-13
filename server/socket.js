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
    const sendMessage = async(message)=>{
        const senderSocketID = userSocketMap.get(message.sender)
        const recipientSocketID = userSocketMap.get(message.recipient);
        const createdMessage = await Message.create(message)
        const messageData = await Message.findById(message._id)
        .populate("sender","id email firstName lastName image color")
        .populate("recipient","id email firstName lastName image color")

        if(recipientSocketID){
            io.to(recipientSocketID).emit("recieveMessage",messageData)
        }
        if(senderSocketID){
            io.to(senderSocketID).emit("recieveMessage",messageData)

        }

    }
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId,socket.id)
            console.log("User Connected: "+userId +" with socket id: "+ socket.id)
        }else{
            console.log("User Id not provided during connection")
        }
        socket.on("sendmessage",sendMessage)
        socket.on("disconnect",()=>disconnect(socket))
    })

}

export default setUpSocket;