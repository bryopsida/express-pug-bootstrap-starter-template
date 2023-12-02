'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminRole = {
      id: 0,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const userRole = {
      id: 1,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const viewerRole = {
      id: 2,
      role: 'viewer',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await queryInterface.bulkInsert('Roles', [adminRole, userRole, viewerRole])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.delete(null, 'Roles', 0)
    await queryInterface.delete(null, 'Roles', 1)
    await queryInterface.delete(null, 'Roles', 2)
  }
}
