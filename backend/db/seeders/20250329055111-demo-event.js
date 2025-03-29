'use strict';
const { Event } = require("../models");
const { Op } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        name: "Springfield High School Football - Ravens vs. Eagles",
        date: new Date("2023-06-15"),
        time: "10:00 AM",
        location: "Springfield High School Stadium",
        description: "Join us for a exciting game against the eagles.",
        status: "upcoming",
      },
      {
        name: "Lincoln High School Football Game",
        date: new Date("2023-09-01"),
        time: "7:00 PM",
        location: "Lincoln High School Stadium",
        description: "Cheer on the Lincoln Lions as they take on the Washington Eagles.",
        status: "upcoming",
      },
      {
        name: "Washington High School BasketBall Game",
        date: new Date("2023-05-10"),
        time: "5:00 PM",
        location: "Washington High School Gymnasium",
        description: "Watch the Washington Eagles compete against the Creston Lions.",
        status: "upcoming",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Springfield High School Football - Ravens vs. Eagles",
            "Lincoln High School Football Game",
            "Washington High School BasketBall Game",
          ],
        },
      },
      {}
    );
  }
};
