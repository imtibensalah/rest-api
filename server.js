const express = require ('express');
const mongoose = require ('mongoose');
const User = require ('./models/user');
//Midleware


const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> {
    console.log('Server is running')
});
// connect to MongoDB
mongoose.connect('mongodb+srv://imtiyez:imtiyez123@cluster0.bwtbm23.mongodb.net/', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(( )=> console.log ('Connected to MongoDB'))
.catch(err=> console.error ('Error connecting to MongoBD', err));

//routes 
//retrun all users 
app.get('/users',async (req, res)=>{
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error){
        res.status(500).send("Failed to get users");
    }
}
);

//post a new user 
app.post ('/users', async (req,res)=> { 
    try {
    const {name , email , age}= req.body; 

    const newUser = new User ({name , email , age });
     const savedUser = await newUser.save (); 
     res.status(201).json(savedUser);
} catch (error) {
    res.status(500).json({error:"Failed to add user"});
}
}
);

// put a user ID

app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const userId = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, age }, { new: true }); 
        res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});