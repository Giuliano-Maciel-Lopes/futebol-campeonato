import { PrismaClient, Position, PlayerRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 50; i++) {
    const positionValues = Object.values(Position);
    const randomPosition =
      positionValues[Math.floor(Math.random() * positionValues.length)];

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: "123456", // senha padrão
        role: "PLAYER",
      },
    });

    // Cria Player associado ao User criado
    await prisma.player.create({
      data: {
        nameCart: i.toString(),
        position: randomPosition,
        number: i,
        role: PlayerRole.PLAYER,
        isActive: true,
        photoUrl: null,
        goals: 0,
        assists: 0,
        userId: user.id, // associa ao user criado
      },
    });
  }

  console.log("Seed de 50 jogadores com usuários criada!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
