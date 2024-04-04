-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TopicTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TopicTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("tag_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TopicTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("topic_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Topic" (
    "topic_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "childTopicId" INTEGER,
    CONSTRAINT "Topic_childTopicId_fkey" FOREIGN KEY ("childTopicId") REFERENCES "Topic" ("topic_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Topic" ("name", "topic_id", "userId") SELECT "name", "topic_id", "userId" FROM "Topic";
DROP TABLE "Topic";
ALTER TABLE "new_Topic" RENAME TO "Topic";
CREATE UNIQUE INDEX "Topic_childTopicId_key" ON "Topic"("childTopicId");
CREATE INDEX "Topic_topic_id_idx" ON "Topic"("topic_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicTags_AB_unique" ON "_TopicTags"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicTags_B_index" ON "_TopicTags"("B");
