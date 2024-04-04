-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "image_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Image_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("imageData", "image_id", "title", "topicId") SELECT "imageData", "image_id", "title", "topicId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE INDEX "Image_image_id_idx" ON "Image"("image_id");
CREATE TABLE "new_Link" (
    "link_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Link_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("description", "link_id", "title", "topicId", "url") SELECT "description", "link_id", "title", "topicId", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE INDEX "Link_link_id_idx" ON "Link"("link_id");
CREATE TABLE "new_Note" (
    "note_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Note_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("note_id", "text", "title", "topicId") SELECT "note_id", "text", "title", "topicId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE INDEX "Note_note_id_idx" ON "Note"("note_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
