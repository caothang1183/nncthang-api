module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: "updated_at",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: "created_at",
      },
    },
    {
      freezeTableName: true,
    }
  );

  return User;
};
