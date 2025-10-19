-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "candident" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);
