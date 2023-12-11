const express = require('express');
let router = express.Router();
var users = require("../../models/users");

//allusers
router.get('/', async (req, res) => {
    let user = await users.find();
    return res.send(user);
});
//specifi user
router.get('/:id', async (req, res) => {
    try {
        let user = await users.findById(req.params.id);
        if (!user) return res.status(404).send("User with given id Not found...");
        return res.send(user);
    } catch (err) {
        return res.status(404).send('invalid id');
    }
});

// var { name, email, address } = req.body;
//         data = await users.findByIdAndUpdate(req.params.id, {
//             name, email, address
//         });
//         await data.save().then(()=>{
//             res.status(200).json({ message :"user updated successfully"})
//         });
//update a user
router.put('/:id', async (req, res) => {
    try {
        let user = await users.findById(req.params.id);
        if (!user) return res.status(404).send("User with given id Not found...");
        user.name = req.body.name;
        user.email = req.body.email;
        user.address = req.body.address;
        await user.save();
        return res.send(user);
    } catch (err) {
        return res.status(404).send('invalid id');
    }
})


//delete a user
router.delete('/:id', async (req, res) => {
    try {
        let user = await users.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send("User with given id Not found...");
        return res.send(user);
    } catch (err) {
        return res.status(404).send('invalid id');
    }
})


//post a user
router.post('/', async (req, res) => {
    let user = new users();
    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    await user.save();
    return res.send(user);
})
module.exports = router;