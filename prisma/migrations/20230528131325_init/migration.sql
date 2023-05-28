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
    CONSTRAINT "FinishProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FinishProduct" ("content", "createdAt", "data", "description", "id", "image", "productId", "published", "slug", "slugOriginal", "title") SELECT "content", "createdAt", "data", "description", "id", "image", "productId", "published", "slug", "slugOriginal", "title" FROM "FinishProduct";
DROP TABLE "FinishProduct";
ALTER TABLE "new_FinishProduct" RENAME TO "FinishProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
