const Address = require("../models/Address");


const addresses = [
    {
      _id: "65c26398e1e1a2106ac8fbd5",
      user: "65b8e564ea5ce114184ccb96",
      street: "Strada Mihai Eminescu 11",
      city: "Cluj-Napoca",
      state: "Cluj",
      phoneNumber: "0723123456",
      postalCode: "400001",
      country: "Romania",
      type: "Home",
      __v: 0,
    },
    {
      _id: "65c26412e1e1a2106ac8fbd8",
      user: "65b8e564ea5ce114184ccb96",
      street: "Bulevardul Unirii 18",
      city: "București",
      state: "București",
      phoneNumber: "0744987654",
      postalCode: "030119",
      country: "Romania",
      type: "Business",
      __v: 0,
    },
  ];
  

exports.seedAddress = async () => {
try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
} catch (error) {
    console.log(error);
}
};
  