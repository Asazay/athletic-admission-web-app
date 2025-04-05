'use strict';
const { Event } = require("../models");
const { Op } = require("sequelize");
const school = require("../models/school");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        schoolId: 1,
        name: "Springfield High School Football - Ravens vs. Eagles",
        date: new Date("2023-06-15"),
        time: "10:00 AM",
        location: "Springfield High School Stadium",
        description: "Join us for a exciting game against the eagles.",
        price: 15.00,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ReTHK1NLoIBGiCvz9mCJCNzJDDtjs34fdg&s",
        status: "upcoming",
      },
      {
        schoolId: 1,
        name: "Ravens vs. Panthers Basketball Game",
        date: new Date("2023-07-20"),
        time: "3:00 PM",
        location: "Springfield High School Gymnasium",
        description: "Watch the Ravens take on the Panthers in this thrilling basketball game.",
        status: "upcoming",
        imageUrl: "https://img.freepik.com/free-photo/different-sport-balls_1048-2681.jpg",
        price: 20.00,
      },
      {
        schoolId: 1,
        name: "Springfield High School Track Meet",
        date: new Date("2023-08-05"),
        time: "9:00 AM",
        location: "Springfield High School Track",
        description: "Cheer on our athletes as they compete in various track and field events.",
        status: "upcoming",
        imageUrl: "https://img.freepik.com/free-photo/different-sport-balls_1048-2681.jpg",
        price: 10.00,
      },
      {
        schoolId: 2,
        name: "Lincoln High School Football Game",
        date: new Date("2023-09-01"),
        time: "7:00 PM",
        location: "Lincoln High School Stadium",
        description: "Cheer on the Lincoln Lions as they take on the Washington Eagles.",
        status: "upcoming",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtmwy7wU3QbtkkGO77G4II2QLZrKWqjX_SIQ&s",
        price: 10.00,
      },
      {
        schoolId: 3,//
        name: "Washington High School BasketBall Game",
        date: new Date("2023-05-10"),
        time: "5:00 PM",
        location: "Washington High School Gymnasium",
        description: "Watch the Washington Eagles compete against the Creston Lions.",
        status: "upcoming",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotv87amkZZYIZmmq4WBmO86EMDDQW4cRU5w&s",
        price: 12.00,
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
