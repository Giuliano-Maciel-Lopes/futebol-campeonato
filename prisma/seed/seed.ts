import { PrismaClient, Position, PlayerRole } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const names = ["Lucas", "Gabriel", "João", "Matheus", "Pedro", "Rafael", "Felipe", "Vinicius", "Gustavo", "Bruno"];
  const surnames = ["Silva", "Souza", "Oliveira", "Costa", "Pereira", "Alves", "Rodrigues", "Martins"];
  return `${names[getRandomInt(0, names.length - 1)]} ${surnames[getRandomInt(0, surnames.length - 1)]}`;
}

function getRandomPhotoUrl() {
  return `https://i.pravatar.cc/150?img=${getRandomInt(1, 70)}`;
}

async function main() {
  const positions: Position[] = ["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"];

  // 1️⃣ Criar 100 usuários
  const usersData = Array.from({ length: 100 }).map(() => ({
    email: `user${getRandomInt(1000, 9999)}@teste.com`,
    name: getRandomName(),
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await prisma.user.createMany({ data: usersData, skipDuplicates: true });
  let allUsers = await prisma.user.findMany();

  // 2️⃣ Criar 5 times com capitão depois
  const teams = [];
  for (let i = 0; i < 5; i++) {
    // Pega 14 usuários para o time
    const teamUsers = allUsers.splice(0, 14);

    // Primeiro jogador será o capitão
    const captainUser = teamUsers[0];

    // Cria jogador capitão
    const captainPlayer = await prisma.player.create({
      data: {
        nameCart: `Player ${captainUser.name}`,
        position: positions[getRandomInt(0, positions.length - 1)],
        number: getRandomInt(1, 99),
        photoUrl: getRandomPhotoUrl(),
        goals: getRandomInt(0, 50),
        assists: getRandomInt(0, 50),
        isActive: true,
        userId: captainUser.id,
        role: PlayerRole.CAPITAO,
        positionIndex: 0,
      },
    });

    // Cria o time com o ID do capitão
    const team = await prisma.team.create({
      data: {
        name: `Time ${i + 1}`,
        isActive: true,
        captainId: captainPlayer.id,
      },
    });

    // Cria os outros jogadores do time
    const otherPlayersData = teamUsers.slice(1).map((user, idx) => ({
      nameCart: `Player ${user.name}`,
      position: positions[getRandomInt(0, positions.length - 1)],
      number: getRandomInt(1, 99),
      photoUrl: getRandomPhotoUrl(),
      goals: getRandomInt(0, 50),
      assists: getRandomInt(0, 50),
      isActive: true,
      userId: user.id,
      role: PlayerRole.PLAYER,
      teamId: team.id,
      positionIndex: idx + 1 < 7 ? idx + 1 : null, // 0-6 titulares, resto reservas
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await prisma.player.createMany({ data: otherPlayersData, skipDuplicates: true });

    teams.push(team);
  }

  console.log("✅ 5 times com 14 jogadores criados com capitão definido!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
