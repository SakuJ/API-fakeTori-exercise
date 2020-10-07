const express = require('express')
const bodyParser = require('body-parser');
const passwordHash = require('password-hash')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());

let item = [
  {
    itemId: uuidv4(),
    title: 'title',
    description: 'description',
    category: {
      cars: false,
      home: false,
      clothings: false,
      electronic: false,
      other: true
    },
    location: {
      city: 'city',
      postalCode: 90100
    },
    //image
    deliverytype: {
      shipping: false,
      pickup: true
    },
    contactinfo: {
      sellerName: 'sellername',
      sellerEmail: 'email',
      sellerPhonenumber: 0450450450
    },
    dateOfPosting: Date.now()
  }
]

let user = [
  {
    uid: uuidv4(),
    username: 'username',
    email: 'email',
    phoneNumber: 0450450450,
    password: 'password123',
    name: 'name',
    address: {
      street: 'Street',
      postalCode: 90130,
      city: 'city'
    }
  },
];

//create a new user
app.post('/user', (req, res) => {
  const newUser = {
    uid: uuidv4(),
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    name: req.body.name,
    address: req.body.address
  };

  if(newUser.username.lenght > 0 && typeof newUser.username === 'string',
    newUser.email.lenght > 0 && typeof newUser.email === 'string',
    newUser.phoneNumber.lenght > 0 && typeof newUser.phoneNumber === 'number',
    newUser.password.lenght > 4 && typeof newUser.password === 'string',
    newUser.name.lenght > 0 && typeof newUser.name === 'string',
    newUser.address.street.lenght > 0 && typeof newUser.address.street === 'string',
    newUser.address.postalCode.lenght > 0 && typeof newUser.address.postalCode === 'number',
    newUser.address.city.length > 0 && typeof newUser.address.city === 'string'
  ) {
    newUser.password = passwordHash.generate(newUser.password);
    user.push(newUser);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post('/item', (req, res) => {
  const newItem = {
    itemId: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    deliverytype: req.body.deliverytype,
    contactinfo: req.body.contactinfo,
    dateOfPosting: Date.now()
  };

  if(newItem.title.lenght > 0 && typeof newItem.title === 'string',
    newItem.description.lenght > 0 && typeof newItem.description === 'string',
    newItem.location.city.lenght > 0 && typeof newItem.location.city === 'string',
    newItem.location.postalCode.lenght > 0 && typeof newItem.location.postalCode === 'number',
    newItem.contactinfo.sellerName.lenght > 0 && typeof newItem.contactinfo.sellerName === 'string',
    newItem.contactinfo.sellerEmail.lenght > 0 && typeof newItem.contactinfo.sellerEmail === 'string',
    newItem.contactinfo.sellerPhonenumber.length > 0 && typeof newItem.contactinfo.sellerPhonenumber === 'number') 
    {
    if(Object.values(newItem.category).some(e => e === true)) 
    {
      item.push(newItem)
      res.sendStatus(200);
    } else {
      console.log(Object.values(newItem.category).some(e => e === true))
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
})



let apiInstance = null;

exports.start = () => {
  apiInstance = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
}

exports.stop = () => {
  apiInstance.close();
}