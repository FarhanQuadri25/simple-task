import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.party.createMany({
    data: [
      {
        firstName: "Rohit",
        secondName: "Sharma",
        mobile1: "1234567890",
        mobile2: "1234567890",
        email: "rohit.sharma@example.com",
        address: "House 10, Lajpat Nagar, New Delhi",
        status: "active",
        type: "client",
      },
      {
        firstName: "Suresh",
        secondName: "Mehta",
        mobile1: "1234567890",
        mobile2: null,
        email: "suresh.mehta@example.com",
        address: "Flat 2B, Koregaon Park, Pune",
        status: "inactive",
        type: "vendor",
      },
      {
        firstName: "Amit",
        secondName: "Verma",
        mobile1: "9090909090",
        mobile2: "8080808080",
        email: "amit.verma@example.com",
        address: "12, MG Road, Bengaluru",
        status: "active",
        type: "partner",
      },
      {
        firstName: "Vikram",
        secondName: "Reddy",
        mobile1: "1234567890",
        mobile2: null,
        email: "vikram.reddy@example.com",
        address: "Plot 23, Jubilee Hills, Hyderabad",
        status: "active",
        type: "client",
      },
      {
        firstName: "Kunal",
        secondName: "Patel",
        mobile1: "1234567890",
        mobile2: "1234567890",
        email: "kunal.patel@example.com",
        address: "56, CG Road, Ahmedabad",
        status: "inactive",
        type: "vendor",
      },
    ],
  });

  console.log("✅ Seed data inserted into Party table.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
