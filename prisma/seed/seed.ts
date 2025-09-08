import { PrismaClient, Position, PlayerRole } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const names = ["Lucas", "Gabriel", "João", "Matheus", "Pedro", "Rafael", "Felipe", "Vinicius", "Gustavo", "Bruno"];
  const surnames = ["Silva", "Souza", "Oliveira", "Costa", "Pereira", "Alves", "Rodrigues", "Martins"];
  return `${names[getRandomInt(0, names.length - 1)]}${surnames[getRandomInt(0, surnames.length - 1)]}${getRandomInt(1, 999)}`;
}

function getRandomPhotoUrl() {
  return `https://i.pravatar.cc/150?img=${getRandomInt(1, 70)}`;
}

async function main() {
  const positions: Position[] = ["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"];

  // Criar 100 usuários
  const usersData = Array.from({ length: 100 }).map(() => ({
    email: `user${getRandomInt(1000, 9999)}@teste.com`,
    name: getRandomName(),
    password: "123456", // senha de teste
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const users = await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  const allUsers = await prisma.user.findMany(); // pegar todos os usuários criados

  // Criar 100 players vinculados aos usuários
  const playersData = allUsers.map((user, index) => ({
    nameCart: `Player${index + 1}`,
    position: positions[getRandomInt(0, positions.length - 1)],
    number: getRandomInt(1, 99),
    photoUrl: getRandomPhotoUrl(),
    goals: getRandomInt(0, 50),
    assists: getRandomInt(0, 50),
    isActive: true,
    userId: user.id,
    role: PlayerRole.PLAYER,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await prisma.player.createMany({
    data: playersData,
    skipDuplicates: true,
  });

  console.log("✅ 100 usuários e 100 players criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
