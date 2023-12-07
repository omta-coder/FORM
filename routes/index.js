var express = require('express');
var router = express.Router();

const Users = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {

  try {
    const user = new Users(req.body);
    await user.save()
    res.redirect("/show");
  } catch (error) {
    res.send(error);
  }

});

router.get('/show', async function(req, res, next) {
  try {
    const users= await Users.find();
    res.render('show', { users: users });
  } catch (error) {
    res.send(error);
  }
});

router.get('/details/:id', async function(req, res, next) {
  try {
   const user = await Users.findById(req.params.id);
   res.render("details",{user:user});
 
  } catch (error) {
   res.send(error);
  }
 });

 router.get('/delete/:id', async function(req, res, next) {
  try {
    await Users.findByIdAndDelete(req.params.id);
      res.redirect("/show")
  } catch (error) {
     res.send(error);
  }
});

router.get('/update/:id',async function(req, res, next) {
  try {
    const user = await Users.findById(req.params.id);
    res.render("update",{user:user});
  
   } catch (error) {
    res.send(error);
   }
});

router.post('/update/:id',async function(req, res, next) {
  try {
    await Users.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/details/${req.params.id}`)
  } catch (error) {
     res.send(error);
  }
});



module.exports = router;
