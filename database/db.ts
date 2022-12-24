import mongoose from 'mongoose';

// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

const connectDB = {
    isConnected: 0,

}

export const connect = async () => {
    if( connectDB.isConnected ) {
        console.log('ya estamos conectados')
        return;
    }

    if( mongoose.connections.length > 0) {
        connectDB.isConnected = mongoose.connections[0].readyState;
        if (connectDB.isConnected === 1) {
            console.log('ya estamos conectados')
            return;
        }
        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGODB_URL || '')
    connectDB.isConnected = 1;

    console.log('conectado', process.env.MONGODB_URL)

}

export const disconnect = async () => {

    if(process.env.NODE_ENV === 'development') return

    if (connectDB.isConnected === 0) return 
    await mongoose.disconnect();
    console.log('desconectado de mongoDB')
}