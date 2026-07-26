import prisma from "../src/config/prisma.js";
import { cuid } from "@paralleldrive/cuid2";

const pixels = await prisma.pixel.findMany();

for (const pixel of pixels) {
  await prisma.pixel.update({
    where: {
      id: pixel.id,
    },
    data: {
      pixelToken: cuid(),
    },
  });
}

console.log("✅ All pixel tokens generated.");

await prisma.$disconnect();
