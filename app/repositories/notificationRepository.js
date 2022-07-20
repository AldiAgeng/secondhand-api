const { Notification, Order, Product } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  createNotification(data) {
    return Notification.create({
      id_order: data,
    });
  },
  findNotificationSeller(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture"],
              where: {
                id_user: user.id,
              },
            },
          ],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
  },
  findNotificationBuyer(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          where: {
            [Op.and]: [
              {
                status: {
                  [Op.in]: ["rejected", "accepted"],
                },
              },
              {
                id_user: user.id,
              },
            ],
          },
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture"],
            },
          ],
        },
      ],

      order: [["updatedAt", "DESC"]],
    });
  },
  findOneNotification(id) {
    return Notification.findOne({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture"],
            },
          ],
        },
      ],
      where: {
        id,
      },
    });
  },
};
