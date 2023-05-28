-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "data" TEXT,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CountryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_NationalToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NationalToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "National" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NationalToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToProduct_AB_unique" ON "_CountryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToProduct_B_index" ON "_CountryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NationalToProduct_AB_unique" ON "_NationalToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_NationalToProduct_B_index" ON "_NationalToProduct"("B");
