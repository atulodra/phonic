/*
  Warnings:

  - You are about to drop the column `genres` on the `Song` table. All the data in the column will be lost.
  - Added the required column `img` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "genres",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
