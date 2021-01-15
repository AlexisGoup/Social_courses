module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.TEXT
        },
        subject: {
            type:Sequelize.STRING
        }
    });

  return Teacher;
};