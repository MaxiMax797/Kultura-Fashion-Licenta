const User = require("../models/User");

const users = [
  {
    _id: "65b8e564ea5ce114184ccb96",
    name: "John",
    surname: "Doe",
    email: "demo@gmail.com",
    password: '$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze',
    phoneNumber: "0721234567",
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
  {
    _id: "65c2526fdcd9253acfbaa731",
    name: "Barbu",
    surname: "Eftimie",
    email: "demo2@gmail.com",
    password: '$2a$10$tosjkprqtomSah0VJNyKi.TIv1JU65pl1i1IJ6wUttjYw.ENF99jG',
    phoneNumber: "0745123456",
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
  {
    _id: "6836edb7471167cec111a71c",
    name: "Maxi",
    surname: "Goga",
    email: "maxi@oracle.com",
    password: "$2b$10$jK8B8uZUbIHa8M3Zs.F7QeEXUSyrQ8QA/n.hSz09LH7vyruv90Txa",
    phoneNumber: "0756789012",
    isVerified: true,
    isAdmin: true,
    __v: 0
  },
  {
    _id: "65c2526fdcd9253acfbab001",
    name: "Alexandru",
    surname: "Ionescu",
    email: "alex.ionescu@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0732456789",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d2",
    name: "Maria",
    surname: "Popescu",
    email: "maria.popescu@yahoo.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0763987654",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d3",
    name: "Andrei",
    surname: "Popa",
    email: "andrei.popa@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0741234567",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d4",
    name: "Elena",
    surname: "Dumitru",
    email: "elena.dumitru@hotmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0758901234",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d5",
    name: "Mihai",
    surname: "Stoica",
    email: "mihai.stoica@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0734567890",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d6",
    name: "Cristina",
    surname: "Gheorghe",
    email: "cristina.gheorghe@yahoo.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0765432109",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d7",
    name: "Daniel",
    surname: "Constantin",
    email: "daniel.constantin@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0742345678",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d8",
    name: "Ana",
    surname: "Marinescu",
    email: "ana.marinescu@hotmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0759876543",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6d9",
    name: "Radu",
    surname: "Diaconu",
    email: "radu.diaconu@yahoo.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0735678901",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6da",
    name: "Ioana",
    surname: "Stanescu",
    email: "ioana.stanescu@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0766789012",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
  {
    _id: "67a8f2c4e9d5b3a1c8f7e6db",
    name: "Cristian",
    surname: "Goga",
    email: "cristi.goga2003@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    phoneNumber: "0743456789",
    isVerified: true,
    isAdmin: false,
    __v: 0
  },
];

exports.seedUser = async () => {
  try {
    await User.insertMany(users);
    console.log("User seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

//$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze = helloWorld@123