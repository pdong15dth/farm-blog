/*
  Warnings:

  - You are about to drop the column `countryName` on the `National` table. All the data in the column will be lost.
  - Added the required column `nationalName` to the `National` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_National" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nationalName" TEXT NOT NULL,
    "slug" TEXT
);
INSERT INTO "new_National" ("id", "slug") SELECT "id", "slug" FROM "National";
DROP TABLE "National";
ALTER TABLE "new_National" RENAME TO "National";
CREATE UNIQUE INDEX "National_nationalName_key" ON "National"("nationalName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
