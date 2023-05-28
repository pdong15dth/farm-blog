/*
  Warnings:

  - You are about to drop the column `finishProductId` on the `Country` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "countryName" TEXT NOT NULL,
    "slug" TEXT
);
INSERT INTO "new_Country" ("countryName", "id", "slug") SELECT "countryName", "id", "slug" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_countryName_key" ON "Country"("countryName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
