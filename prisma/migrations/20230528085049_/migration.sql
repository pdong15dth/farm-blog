/*
  Warnings:

  - You are about to drop the `_CountryToFinishProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CountryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FinishProductToNational` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NationalToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `FinishProduct` table. All the data in the column will be lost.
  - Added the required column `productId` to the `FinishProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CountryToFinishProduct_B_index";

-- DropIndex
DROP INDEX "_CountryToFinishProduct_AB_unique";

-- DropIndex
DROP INDEX "_CountryToProduct_B_index";

-- DropIndex
DROP INDEX "_CountryToProduct_AB_unique";

-- DropIndex
DROP INDEX "_FinishProductToNational_B_index";

-- DropIndex
DROP INDEX "_FinishProductToNational_AB_unique";

-- DropIndex
DROP INDEX "_NationalToProduct_B_index";

-- DropIndex
DROP INDEX "_NationalToProduct_AB_unique";

-- AlterTable
ALTER TABLE "Country" ADD COLUMN "finishProductId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "country" TEXT;
ALTER TABLE "Product" ADD COLUMN "national" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToFinishProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FinishProductToNational";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NationalToProduct";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinishProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "slug" TEXT,
    "slugOriginal" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "data" TEXT,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FinishProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FinishProduct" ("content", "createdAt", "data", "description", "id", "image", "published", "slug", "slugOriginal", "title") SELECT "content", "createdAt", "data", "description", "id", "image", "published", "slug", "slugOriginal", "title" FROM "FinishProduct";
DROP TABLE "FinishProduct";
ALTER TABLE "new_FinishProduct" RENAME TO "FinishProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
