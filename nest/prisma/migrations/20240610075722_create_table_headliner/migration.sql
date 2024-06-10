-- CreateTable
CREATE TABLE `headliners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` LONGTEXT NOT NULL,
    `headliner` LONGTEXT NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `headliners` ADD CONSTRAINT `headliners_username_fkey` FOREIGN KEY (`username`) REFERENCES `admins`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
