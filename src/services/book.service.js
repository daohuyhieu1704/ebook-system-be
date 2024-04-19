import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import Book from "../models/Book.js";
import Token from "../models/Token.js";
import { where } from "sequelize";
import Category from "../models/Category.js";
import Author from "../models/Author.js";
import Inventory from "../models/Inventory.js";
import ShoppingSession from "../models/ShoppingSession.js";
import CartItem from "../models/CartItem.js";

class BookService {
  // BOOK SERVICES
  async TopTrendingBooks() {
    try {
      let query = await OrderItem.findAll({
        include: [
          {
            required: true,
            model: Book,
          },
        ],
      });
      let books = query.map((book) => book.dataValues);
      return books;
    } catch (error) {
      return { error };
    }
  }

  // CRUD administration
  async CreateBook({ book }) {
    try {
      let {
        title,
        description,
        image,
        price,
        author_ID,
        category_ID,
        inventory_ID,
      } = book;
      let my_book = await Book.create({
        title,
        description,
        image,
        price,
        author_ID,
        category_ID,
        inventory_ID,
      });

      return { ...my_book.dataValues };
    } catch (error) {
      return { error };
    }
  }

  async GetAllBooks() {
    try {
      let query = await Book.findAll({
        include: [
          {
            required: true,
            model: Author,
          },
          {
            required: true,
            model: Category,
          },
          {
            required: true,
            model: Inventory,
          },
        ],
      });
      console.log(query)
      let books = query.map((book) => book.dataValues);
      return books;
    } catch (error) {
      return { error };
    }
  }

  async GetBookByID({ id }) {
    try {
      let book = await Book.findOne({
        where: { id },
        include: [
          {
            required: true,
            model: Author,
          },
          {
            required: true,
            model: Category,
          },
          {
            required: true,
            model: Inventory,
          },
        ],
      });

      return { ...book.dataValues };
    } catch (error) {
      return { error };
    }
  }

  async GetCartItems({ user, pageNum }) {
    try {
        let limit = 20;
        let offset = 0 + (pageNum - 1) * limit;
        let session = await ShoppingSession.findOne({where: {
            user_ID: user
        }})
        let total = session.total;
        let allCartItems = await CartItem.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [["created_at", "ASC"]],
          include: {
            required: true,
            model: Book,
          }
        })
        return { total,  allCartItems}
    } catch (error) {
        // throw "Email hoặc password không chính xác"  
        throw error             
    }

}

  async UpdateBook({ id, book }) {
    try {
      await Book.update(
        { ...book, modified_at: Date.now() },
        {
          where: { id },
        }
      );

      return { id, ...book, modified_at: Date.now() };
    } catch (error) {
      return { error };
    }
  }

  async DeleteBook({ id }) {
    try {
      let book = await Book.findOne({ where: { id } });
      await Book.destroy({
        where: { id },
      });
      return { ...book };
    } catch (error) {
      return { error };
    }
  }
}

export default BookService;
