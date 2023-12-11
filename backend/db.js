const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://preethamg211me337:n8GFp2yKhor2klzq@inotebook.qw6gdbv.mongodb.net/?retryWrites=true&w=majority";

const need = () =>{
  console.log("Connected to Mongo Successfully");
}

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, need())
}

module.exports = connectToMongo;