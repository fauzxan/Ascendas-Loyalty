const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://cyx:loyalty@ascenda-loyalty.pehi0t8.mongodb.net/loyalty?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.error(`Error connecting to the database. n${err}`);
});