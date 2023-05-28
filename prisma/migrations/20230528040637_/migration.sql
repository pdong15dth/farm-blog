-- CreateTable
CREATE TABLE "FinishProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "slug" TEXT,
    "slugOriginal" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "data" TEXT,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_CountryToFinishProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CountryToFinishProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToFinishProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "FinishProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FinishProductToNational" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FinishProductToNational_A_fkey" FOREIGN KEY ("A") REFERENCES "FinishProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FinishProductToNational_B_fkey" FOREIGN KEY ("B") REFERENCES "National" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToFinishProduct_AB_unique" ON "_CountryToFinishProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToFinishProduct_B_index" ON "_CountryToFinishProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FinishProductToNational_AB_unique" ON "_FinishProductToNational"("A", "B");

-- CreateIndex
CREATE INDEX "_FinishProductToNational_B_index" ON "_FinishProductToNational"("B");
