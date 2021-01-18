module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        body_text: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.TEXT
        }
    });

  return Publication;
};