import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

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
  // Clear existing tickets
  await prisma.ticket.deleteMany();

  // Option 3: Most straightforward
  await prisma.ticket.createMany({
    data: tickets,
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
