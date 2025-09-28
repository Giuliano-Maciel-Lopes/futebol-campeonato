import { prisma } from "@/database/prisma-config";

async function main() {
  console.log(" Limpando tabelas...");

  // 1. limpa as tabelas que PODEM ser apagadas
  await prisma.matchEvent.deleteMany();
  await prisma.match.deleteMany();
  await prisma.group.deleteMany();

  console.log(" Tabelas limpas!");

  // 2. recria os grupos A, B, C, D
  console.log(" Criando grupos iniciais...");

  const groups = await prisma.group.createMany({
    data: [
      { name: "A" },
      { name: "B" },
      { name: "C" },
      { name: "D" },
    ],
    skipDuplicates: true, // evita erro se já existirem
  });

  console.log(`✅ ${groups.count} grupos criados (A, B, C, D)!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
