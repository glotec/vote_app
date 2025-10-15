-- CreateTable
CREATE TABLE "Users" (
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_connected" BOOLEAN NOT NULL DEFAULT false,
    "activated" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Candident" (
    "cid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Candident_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Pic" (
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pic_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Student" (
    "mat" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("mat")
);

-- CreateTable
CREATE TABLE "Vote" (
    "vid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "candident" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("vid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_code_key" ON "Vote"("code");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UserRole"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candident_fkey" FOREIGN KEY ("candident") REFERENCES "Candident"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_code_fkey" FOREIGN KEY ("code") REFERENCES "Student"("mat") ON DELETE RESTRICT ON UPDATE CASCADE;
