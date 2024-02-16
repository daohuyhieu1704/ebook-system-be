import express from "express";
import BookController from "../../controllers/book.controller.js";
import { jwtMiddleware } from "../../configs/jwt.middleware.js";
import { adminMiddleware } from "../../configs/admin.middleware.js";

const router = express.Router();

// Book's functions
router.get("/shop/top-trending-books", jwtMiddleware, new BookController().getTopTrendingBooks);
// router.get("/shop/getall-books", jwtMiddleware, new BookController().getAllBooks);
// router.get("/shop/get-book/:id", jwtMiddleware, new BookController().getBook);
// router.patch("/shop/update-book/:id", jwtMiddleware, new BookController().patchUpdateBook);
// router.delete("/shop/delete-book", jwtMiddleware, new BookController().deleteBook);

// Admin's functions - CRUD
router.post("/admin/create-book", adminMiddleware, new BookController().postBook);
router.get("/admin/getall-books", adminMiddleware, new BookController().getAllBooks);
router.get("/admin/get-book/:id", adminMiddleware, new BookController().getBook);
router.patch("/admin/update-book/:id", adminMiddleware, new BookController().patchUpdateBook);
router.delete("/admin/delete-book", adminMiddleware, new BookController().deleteBook);

export default router;
