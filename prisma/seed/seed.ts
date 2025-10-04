import { PrismaClient, Position, PlayerRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordPlain = "123456";
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  // 1️⃣ Apaga apenas usuários com email user1@example.com até user50@example.com
  for (let i = 1; i <= 50; i++) {
    const email = `user${i}@example.com`;

    // Deleta o player associado, se existir
    await prisma.player.deleteMany({
      where: { user: { email } },
    });

    // Deleta o usuário
    await prisma.user.deleteMany({
      where: { email },
    });
  }

  // 2️⃣ Cria 50 usuários com senha hashada
  for (let i = 1; i <= 50; i++) {
    const positionValues = Object.values(Position);
    const randomPosition =
      positionValues[Math.floor(Math.random() * positionValues.length)];

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: passwordHash,
        role: "PLAYER",
      },
    });

    // Cria Player associado
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
        userId: user.id,
      },
    });
  }

  console.log(
    "Seed de 50 jogadores (1 a 50) atualizada com senha hashada com sucesso!"
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
