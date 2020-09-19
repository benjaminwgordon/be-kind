// ANCHOR Modules and Constants
// External Modules
const express = require('express');
const router = express.Router();

// Internal Modules
const db = require('../models');





// ANCHOR Routes
// create and push message to user messages
router.post('/', async (req, res) => {
    const user = req.session.currentUser;

    if (!user) {
        res.render('sign-up', {
            myMessage: req.body.content
        });
    } else {
        try {
            req.body.user = user.id;
            const message = await db.Message.create(req.body);
            console.log(message);

            db.User.findByIdAndUpdate(
                req.body.user,
                {
                    $push: {
                        messages: message
                    }
                }, (err, updatedItem) => {
                    if (err) return res.send(err);
                    console.log(updatedItem);
                    res.render('profile', {
                        user: updatedItem
                    });
                });
        } catch (error) {
            console.log('Internal server error!');
        }
    }
});





// ANCHOR Exports
module.exports = router;