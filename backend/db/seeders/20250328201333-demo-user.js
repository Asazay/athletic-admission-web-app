"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demouser@grandevent.com",
          hashedPassword: bcrypt.hashSync("password"),
          role: "user",
        },
        {
          firstName: "Admin",
          lastName: "User",
          email: "adminuser@grandevent.com",
          hashedPassword: bcrypt.hashSync("password"),
          role: "admin",
          schoolId: 1
        },
        {
          firstName: "Principal",
          lastName: "User",
          email: "principaluser@grandevent.com",
          hashedPassword: bcrypt.hashSync("password"),
          role: "principal",
          schoolId: 1
        },
        {
          firstName: "Principal2",
          lastName: "User2",
          email: "principaluser2@grandevent.com",
          hashedPassword: bcrypt.hashSync("password"),
          role: "principal",
          schoolId: 2
        },
        {
          firstName: "Principal3",
          lastName: "User3",
          email: "principaluser3@grandevent.com",
          hashedPassword: bcrypt.hashSync("password"),
          role: "principal",
          schoolId: 3
        }
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: {
        [Op.in]: ['demouser@grandevent.com', "adminuser@grandevent.com", "principaluser@grandevent.com"]
      }
    }, {})
  },
};
