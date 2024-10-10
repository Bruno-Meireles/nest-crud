/*
  Warnings:

  - You are about to drop the column `fileName` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `fileName`,
    DROP COLUMN `filePath`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
