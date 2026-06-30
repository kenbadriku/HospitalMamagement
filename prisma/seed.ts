import "dotenv/config";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@hospital.ug" },
    update: {},
    create: {
      email: "admin@hospital.ug",
      passwordHash,
      name: "System Administrator",
      role: Role.ADMIN,
    },
  });

  const labTests = [
    { code: "HB", name: "Hemoglobin", category: "HEMATOLOGY", specimen: "BLOOD", price: 5000, referenceRange: "11.5-16.5 g/dL", unit: "g/dL" },
    { code: "CBC", name: "Complete Blood Count", category: "HEMATOLOGY", specimen: "BLOOD", price: 15000, referenceRange: "Reference values vary", unit: "" },
    { code: "RDT", name: "Malaria Rapid Diagnostic Test", category: "SEROLOGY", specimen: "BLOOD", price: 8000, referenceRange: "Negative", unit: "" },
    { code: "URINE", name: "Urinalysis", category: "MICROBIOLOGY", specimen: "URINE", price: 5000, referenceRange: "Normal", unit: "" },
  ];

  for (const test of labTests) {
    await prisma.labTest.upsert({
      where: { code: test.code },
      update: {},
      create: {
        ...test,
        price: test.price as unknown as any,
      },
    });
  }

  console.log("Seed completed");
}

main().finally(() => prisma.$disconnect());
