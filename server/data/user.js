import bcrypt from "bcryptjs";

const user = [
  {
    name: "Sultan Al Muhon",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ehsan Emon",
    email: "emon@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Saymon",
    email: "saymon@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default user;
