const express = require('express');
const router = express.Router();

// router.post('/', ({ req, res }) => {
//     console.log(req.body);
//     res.send("hello")
// });

router.get("/", async(req,res) => {
  
    try {
        console.log(req.body)
          res.send(req.body)
    } catch (error) {
        console.error("an unexcepted error occured")
    }
})


module.exports = router;