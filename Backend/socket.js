const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
       

        socket.on('join', async (data) => {
            try {
                

                if (!data || !data.userId || !data.userType) {
                   
                    return; // Ignore invalid data
                }

                const { userId, userType } = data;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error("Error handling join event:", error);
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
               

                if (!data || !data.userId || !data.location || !data.location.ltd || !data.location.lng) {
                    console.error("Invalid location update data received:", data);
                    return; // Ignore invalid data
                }

                const { userId, location } = data;
                
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error("Error updating captain location:", error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
   
    if (io) {
       
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
