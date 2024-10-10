/*
  Warnings:

  - You are about to drop the `upload` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `fileName` VARCHAR(255) NOT NULL,
    ADD COLUMN `filePath` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `upload`;
