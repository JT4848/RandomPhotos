const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();





const seed = async () => {
  console.log("starting seed");
  console.log("making users");

  await prisma.user.create({
    data: {
      firstName: "jt",
      lastName: "pricone",
      username: "jtp",
      password: await bcrypt.hash("jt123", 10),
      email: "jtp@yes.com",
      photos: {
        create: {
          photos: "https://th.bing.com/th?id=OIP.xt9ItBSc5wVwadqY4egdJQHaGs&w=262&h=237&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
          description: "beautiful",
        },
      },
    },
  });

  await prisma.user.create ({
    data: {
      firstName: "johnny",
      lastName: "cash",
      username: "jc",
      password: await bcrypt.hash("jc123", 10),
      email: "jc@yes.com",
      photos: {
        create: {
          photos: "https://th.bing.com/th?id=OIP.-N5OmFPuMEEcdBebS2qKWwHaHT&w=251&h=248&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
          description: "amazing",
        },
      },
    }
  })

  await prisma.user.create ({
    data: {
      firstName: "jamey",
      lastName: "johnson",
      username: "jj",
      password: await bcrypt.hash("jj123", 10),
      email: "jj@yes.com",
      photos: {
        create: {
          photos: "https://th.bing.com/th?id=OIP.UGe0hDgOlhZCZJhjMiiCjwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
          description: "awesome",
        },
      },
    }
  })

  await prisma.user.create ({
    data: {
      firstName: "donald",
      lastName: "duck",
      username: "dd",
      password: await bcrypt.hash("dd123", 10),
      email: "dd@yes.com",
      photos: {
        create: {
          photos: "https://th.bing.com/th/id/OIP.nS23hev0H_az3OPvX1OsHwHaE8?w=306&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7",
          description: "look at this",
        },
      },
    }
  })
  console.log("users created")
  console.log("creating comments")

  await prisma.comment.createMany ({
    data: [
      {
        text: "woah thats funny",
        user_Id: 1,
        photo_Id: 3
      },
      {
        text: "LOL",
        user_Id: 3,
        photo_Id: 1
      },
      {
        text: "Nice pic",
        user_Id: 2,
        photo_Id: 4
      },
      {
        text: "Crazy",
        user_Id: 4,
        photo_Id: 2
      }
    ]
  })
  console.log('comments created')
}

seed();
