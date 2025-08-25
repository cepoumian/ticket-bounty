import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    // use your own email here
    email: "cpoumian@gmail.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the content of ticket 1 from the database.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    bounty: 499, // $ 4.99,
  },
  {
    title: "Ticket 2",
    content: "This is the content of ticket 2 from the database.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399, // $ 3.99
  },
  {
    title: "Ticket 3",
    content: "This is the content of ticket 3 from the database.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599, // $ 5.99
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");
  // Clear existing tickets and users
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("password");

  // Option 3: Most straightforward
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      // Assign all tickets to the first user (admin)
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Completed in ${(t1 - t0).toFixed(2)} ms`);

  // Option 1
  /* for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
  } */

  // Option 2
  /* const promises = tickets.map((ticket) =>
    prisma.ticket.create({
      data: ticket,
    })
  ); */
  // await Promise.all(promises);
};

seed();
