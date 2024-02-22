
const mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
const validator = require("validator");
mongoose.set('strictQuery', true);

// mongoose.connect("mongodb+srv://ArbajDecorus:Lucifer@786@decorus.4qxa2h3.mongodb.net/Decorus-events-data?retryWrites=true&w=majority").then(function(){
//   console.log("Database Connected");
// })

mongoose.connect('mongodb+srv://ArbajDecorus:Lucifer786@decorus.4qxa2h3.mongodb.net/websiteDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

db.on('open', () => {
  console.log('Connected to MongoDB successfully!');
});


const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:[true, "name is required"],
    unique:true,
  },
  email:{
    type:String,
    required:[true, "email is required"],
    validate:[validator.isEmail, "email is invalid"]
  },
  password:{
    type:String,
    select:false,
    // required:[true, "password is required"],
    minLength:[6, "password must have atleast 6 characters"],
    // match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
  },
  mobile:{
    type: String,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"]
  },
})

userSchema.plugin(plm);

module.exports = mongoose.model("user" , userSchema);