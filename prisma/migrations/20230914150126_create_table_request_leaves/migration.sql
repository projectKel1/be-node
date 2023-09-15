-- CreateTable
CREATE TABLE `request_leaves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `reason` LONGTEXT NOT NULL,
    `started_date` DATETIME(3) NOT NULL,
    `ended_date` DATETIME(3) NOT NULL,
    `url_proof` VARCHAR(191) NULL,
    `status` ENUM('pending', 'approved_lead', 'approved_hr', 'reject') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
