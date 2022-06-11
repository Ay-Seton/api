import Hotel from "../models/Hotel.js"                              //import hotel model from file

export const createHotel = async ( req, res, next)=> {              //
    const newHotel = new Hotel (req.body)                            //create new Hotel from the req body
    try {
        const savedHotel = await newHotel.save()                     //save new hotel in db and create a reference
        res.status(200).json(savedHotel)                             // success response, and json data showing saved hotel
    } catch (err) {
        next(err)
    }
};

export const updateHotel = async ( req, res, next)=> {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(                 // find hotel by hotelID in req params
            req.params.id, 
            { $set: req.body},                                             //replace with details in req.body
            {new: true});                                                    
        res.status(200).json(updatedHotel)                                  //res with success status and Json data
    } catch (err) {
        next (err);
    }
}

export const deleteHotel = async ( req, res, next )=> {
    try {
        await Hotel.findByIdAndDelete(                                        //find hotel by req.params ID and delete
              req.params.id);                            
          res.status(200).json("Hotel has been deleted")              // res with success status and string message
      } catch (err) {
        next(err)
      }

}
export const getHotel = async ( req, res, next)=> {
    try {
        const hotel = await Hotel.findById(
              req.params.id);
          res.status(200).json(hotel)
      } catch (err) {
        next(err);
      }
};

export const getHotels = async ( req, res, next)=> {
    const { min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({
              ...others,
             cheapestPrice:{ $gt:min | 1 , $lt:max | 999 } }).limit(req.query.limit);
          res.status(200).json(hotels)
      } catch (err) {
         next(err);
      }

}

export const CountByCity = async ( req, res, next)=> {
    const cities = req.query.cities.split(",")
    try {
         const list = await Promise.all(cities.map(city => { return  Hotel.countDocuments({city:city})}))
          res.status(200).json(list)
      } catch (err) {
         next(err);
      }

}

export const CountByType = async ( req, res, next)=> {
    try {
        const hotelCount = await Hotel.countDocuments({type:"Hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});
        
          res.status(200).json([
              {type: "hotels", count: hotelCount},
              {type: "apartments", count: apartmentCount},
              {type: "resorts", count: resortCount},
              {type: "villas", count: villaCount},
              {type: "cabins", count: cabinCount},
          ])
      } catch (err) {
         next(err);
      }

}