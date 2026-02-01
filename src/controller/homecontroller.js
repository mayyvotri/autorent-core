const {GET_DB} = require ('../config/DB')

const getHomePage   = async (req,res )=> { 
    try {
    const db = GET_DB();
    const users = await db.collection("users").find({}).toArray();

    // res.status(200).json(users);
    console.log(users)
    res.render("home.ejs", {listusers :users})
  } catch (error) {
    res.status(500).json({
      message: "Error getting users",
      error: error.message,
    });
  }
    
}
module.exports = {getHomePage};




