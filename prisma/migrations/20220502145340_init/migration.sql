-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "sku" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coffee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flavor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoffeeToFlavor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToFlavor_AB_unique" ON "_CoffeeToFlavor"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToFlavor_B_index" ON "_CoffeeToFlavor"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_A_fkey" FOREIGN KEY ("A") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_B_fkey" FOREIGN KEY ("B") REFERENCES "Flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
