// prisma/seedMatches.ts
import { prisma } from "@/database/prisma-config";

async function main() {
  const teamIds = [
    "c3eeea25-8b86-4301-922e-578fd098b13e", // EQUIPE X
    "fe401987-ea43-482e-b450-294e0303cf20", // Time Exemplo 3
    "1e4bf67e-0269-40f6-82a6-62d0aca9bd48", // Time Exemplo 4
    "10144ec2-d951-4afa-a67c-9d11b6bba497", // penaldo
  ];

  const stages = ["GROUP", "SEMI", "FINAL"] as const;
const statuses = ["SCHEDULED", "ONGOING", "FINISHED"] as const;


  for (let i = 0; i < 100; i++) {
    // escolher times aleatórios diferentes
    let team1Index = Math.floor(Math.random() * teamIds.length);
    let team2Index;
    do {
      team2Index = Math.floor(Math.random() * teamIds.length);
    } while (team2Index === team1Index);

    // gerar data aleatória entre hoje e 100 dias
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 100));

    // gerar scores aleatórios
    const team1Score = Math.floor(Math.random() * 5);
    const team2Score = Math.floor(Math.random() * 5);

    // gerar estágio e status aleatórios
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    await prisma.match.create({
      data: {
        team1Id: teamIds[team1Index],
        team2Id: teamIds[team2Index],
        date,
        team1Score,
        team2Score,
        stage,
        status,
      },
    });
  }

  console.log("✅ 100 partidas criadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
