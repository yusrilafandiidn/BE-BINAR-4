const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../../helpers/index");

module.exports = {
  createAccounts: async (req, res, next) => {
    try {
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let newAccounts = await prisma.bankAccounts.create({
        data: {
          user_id,
          bank_name,
          bank_account_number,
          balance,
        },
      });
      res.status(201).json({
        status: true,
        message: "Akun berhasil dibuat.",
        data: newAccounts,
      });
    } catch (err) {
      next(err);
    }
  },

  // all account
  getAllAccounts: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let accounts = await prisma.bankAccounts.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const { _count } = await prisma.bankAccounts.aggregate({
        _count: { id: true },
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(200).json({
        status: true,
        message: "OK",
        data: { pagination, accounts },
      });
    } catch (err) {
      next(err);
    }
  },

  // get detail by id
  getDetailAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;
      let accounts = await prisma.bankAccounts.findUnique({
        where: { id: Number(id) },
      });

      if (!accounts) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: "Tidak ada akun dengan id: " + id,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: accounts,
      });
    } catch (err) {
      next(err);
    }
  },

  // update
  updateAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { user_id, bank_name, bank_account_number, balance } = req.body;

      let updateOperation = await prisma.bankAccounts.update({
        where: { id: Number(id) },
        data: {
          user_id,
          bank_name,
          bank_account_number,
          balance,
        },
      });

      res.status(200).json({
        status: true,
        message: "Data berhasil diupdate",
        data: updateOperation,
      });
    } catch (err) {
      next(err);
    }
  },

  // delete
  deleteAccounts: async (req, res, next) => {
    try {
      let { id } = req.params;
  
      let deleteOperation = await prisma.bankAccounts.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({
        status: true,
        message: "Akun berhasil dihapus",
        data: deleteOperation,
      });
    } catch (err) {
      next(err);
    }
  },
  
};
