"use strict";

const { School } = require("../models");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await School.bulkCreate([
      {
        name: "Springfield High School",
        state: "IL",
        city: "Springfield",
        zipCode: "62704",
        address: "123 Main St",
      },
      {
        name: "Lincoln High School",
        state: "CA",
        city: "Los Angeles",
        zipCode: "90001",
        address: "456 Elm St",
      },
      {
        name: "Washington High School",
        state: "NY",
        city: "New York",
        zipCode: "10001",
        address: "789 Oak St",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Schools";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Springfield High School",
            "Lincoln High School",
            "Washington High School",
          ],
        },
      },
      {}
    );
  },
};
