const express = require("express");
const router = new express.Router();
const Products = require("../Models/ProductsShecma");
const USER = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const athenticate = require("../middleware/authenticate");

router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    //console.log("console product"+productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// get indivisual data

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const individualdata = await Products.findOne({ id: id });

    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error " + error.message);
  }
});

// Register data
router.post("/register", async (req, res) => {
  // console.log(req.body);

  const { fname, email, mobile, password, cpassword } = req.body;
  // console.log(fname ,email,mobile,password,cpassword);
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill the all data" });
    console.log("no data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password not macthed" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });
      const storedata = await finaluser.save();
      console.log(storedata);
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("error" + error.message);
    res.status(422).send(error);
  }
});

//Login user Api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //    console.log(email);
  //    console.log(password);
  if (!email || !password) {
    res.status(400).json({ error: "fill the all data" });
  }
  try {
    const userlogin = await USER.findOne({ email: email });
    // console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      // console.log(password);
      //   console.log(userlogin.password);
      //   console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "password not matched" });
      } else {
        const token = await userlogin.generateAuthtoken();
        //  console.log(token);

        res.cookie("Amazonweb", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "user is not recognized" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
    console.log("error" + error.message);
  }
});

//adding the data into cart

router.post("/addcart/:id", athenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");
    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact + "user");

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid error" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid error" });
    console.log("error" + error.message);
  }
});

// gets cart details

router.get("/cartdetails", athenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("error" + error);
  }
});

// get valid user

router.get("/validuser", athenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log("error" + error);
  }
});

// remove item from cart
router.delete("/remove/:id", athenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((curval) => {
      return curval.id != id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item remove");
  } catch (error) {
    console.log("error" + error);
    res.status(400).json(req.rootUser);
  }
});


// for user logout

router.get("/logout",athenticate,(req,res)=>{
  try {
    req.rootUser.tokens= req.rootUser.tokens.filter((currelem)=>{
      return currelem.token != req.token
    });

      res.clearCookie("Amazonweb",{path:"/"});
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("User Logout");
  } catch (error) {
        console.log("error");
  }
})
module.exports = router;
