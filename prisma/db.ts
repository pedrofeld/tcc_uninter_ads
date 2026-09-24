import "dotenv/config";
// Prisma uses Temporal.Instant for DateTime fields and @updatedAt defaults.
// Node does not provide Temporal globally yet, so install the supported polyfill
// before the database client handles any query.
import "temporal-polyfill/full/global";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.js";
import contractJson from "./contract.json" with { type: "json" };

export const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
});
