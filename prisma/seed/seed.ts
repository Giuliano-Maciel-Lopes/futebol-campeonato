import { prisma } from "@/database/prisma-config";

async function seddsgrups() {
  const groups = ["A", "B", "C"];

  await prisma.group.createMany({
    data: groups.map(name => ({ name }))
  });
  console.log("Groups seeded!");
}

seddsgrups()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
