/*
  Warnings:

  - You are about to drop the column `description` on the `Image` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "image_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Image_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("imageData", "image_id", "title", "topicId") SELECT "imageData", "image_id", "title", "topicId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE INDEX "Image_image_id_idx" ON "Image"("image_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
