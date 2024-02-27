const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const password = bcrypt.hashSync("333");
const userData = [
  {
    username: "jirasak",
    lastname: "pimkumlai",
    email: "jirasak@gmail.com",
    password,
    phone: "191",
    role: "admin", 
    position: "manager", 
    status: "working"
  },
  {
    username: "jirasak1",
        lastname: "pimkumlai",
        email: "jirasak1@gmail.com",
        password,
        phone: "191",
        role: "User", 
        position: "employee", 
        status: "working"
  },
];

const RecordIN = [
  {
    username: "jirasak2",
    lastname: "pimkumlai",
    INdueDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: 2,
  },
];

const RecordOut = [
  {
    username: "jirasak2",
    lastname: "pimkumlai",
    OutdueDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: 2,
  },
];

const Detail = [
  {
    username: "jirasak2",
    lastname: "pimkumlai",
    INdueDate: new Date().toISOString(),
    OutdueDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: 2,
  },

];

const run = async () => {
  await prisma.user.createMany({
    data: userData,
  });
  await prisma.recordIN.createMany({
    data: RecordIN,
  });
  await prisma.recordOut.createMany({
    data: RecordOut,
  });
  await prisma.detail.createMany({
    data: Detail,
  });
};

run();
