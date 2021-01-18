module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body_text: {
            type: Sequelize.TEXT
        }
    });

  return Comment;
};