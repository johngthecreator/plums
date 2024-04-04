/*
  Warnings:

  - You are about to drop the column `childTopicId` on the `Topic` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "topic_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentTopicId" INTEGER,
    CONSTRAINT "Topic_parentTopicId_fkey" FOREIGN KEY ("parentTopicId") REFERENCES "Topic" ("topic_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Topic" ("name", "topic_id", "userId") SELECT "name", "topic_id", "userId" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE INDEX "Topic_topic_id_idx" ON "Topic"("topic_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
