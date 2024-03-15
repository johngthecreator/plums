-- CreateTable
CREATE TABLE "Topic" (
    "topic_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "note_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Note_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "image_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Image_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Link" (
    "link_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "Link_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Topic_topic_id_idx" ON "Topic"("topic_id");

-- CreateIndex
CREATE INDEX "Note_note_id_idx" ON "Note"("note_id");

-- CreateIndex
CREATE INDEX "Image_image_id_idx" ON "Image"("image_id");

-- CreateIndex
CREATE INDEX "Link_link_id_idx" ON "Link"("link_id");
