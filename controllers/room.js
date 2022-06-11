import Room from "../models/Room.js"   //model for Rooms
import Hotel from "../models/Hotel.js"  //model for Hotel

export const createRoom = async ( req, res, next)=> {
const hotelId = req.params.hotelid;       //save a reference for the hotelID in a var. Sent from request parameter in endpoint url
const newRoom = new Room(req.body);       // create a new room

try {
    const savedRoom = await newRoom.save();  // save the new room
    try {
    await Hotel.findByIdAndUpdate(      //search through hotels whose ID matches id passed in hotelId var. 
            hotelId, 
           { $push : {rooms: savedRoom._id}   // push to the rooms array property of the hotel
        }
           )
// console.log( await Hotel.findByIdAndUpdate({_id: hotelId}) )
    } catch (err) {
        next(err)
    }
    res.status(200).json(savedRoom);
} catch (err) {
    next(err)
}
};

export const updateRoom = async ( req, res, next)=> {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body}, 
            {new: true});
        res.status(200).json(updatedRoom)
    } catch (err) {
        next (err);
    }
}

export const deleteRoom = async ( req, res, next )=> {
    const hotelId = req.params.hotelid; //save the id of the hotel to be deleted in a var. Save in request parameter. 

    try {
        await Room.findByIdAndDelete( req.params.id);   //find and delete
        try {
            await Hotel.findByIdAndUpdate(       //update the rooms ID saved in the Hotel. 
                    hotelId, 
                   { $pull : {rooms: req.params.id}  //remove the id of the deleted room from Hotels rooms array
                }
                   )
        // console.log( await Hotel.findByIdAndUpdate({_id: hotelId}) )
            } catch (err) {
                next(err)
            }
          res.status(200).json("Room been deleted")
      } catch (err) {
        next(err)
      } 

}
export const getRoom = async ( req, res, next)=> {
    try {
        const Room = await Room.findById(   //find room by the ID 
              req.params.id);
          res.status(200).json(hotel)
      } catch (err) {
        next(err);
      }
};

export const getRooms = async ( req, res, next)=> {
    try {
        const rooms = await Room.find();
          res.status(200).json(rooms)
      } catch (err) {
         next(err);
      }

}