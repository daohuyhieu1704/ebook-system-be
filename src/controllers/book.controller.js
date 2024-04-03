import HttpResponse from '../utils/HttpResponse.js'
import BookService from "../services/book.service.js";
class BookController {

    //BOOK CONTROLLERS
    getTopTrendingBooks = async (req, res, next) => {
        const  { pageNum } = JSON.parse(req.body);
        let data = await new BookService().TopTrendingBooks(pageNum)
        
        if( data?.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }  

    //CRUD ADMIN
    postBook = async (req, res, next) => {
        const book = JSON.parse(req.body);
        let data = await new BookService().CreateBook({ book })
        if( data.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }    

    getAllBooks = async (req, res, next) => {
        let data = await new BookService().GetAllBooks()
        
        if( data?.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }    

    getBook = async (req, res, next) => {
        let { id } = req.params
        let data = await new BookService().GetBookByID({id})
        
        if( data?.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }    

    patchUpdateBook = async (req, res, next) => {
        let { id } = req.params
        const book = JSON.parse(req.body);
        let data = await new BookService().UpdateBook({id, book})
        
        if( data?.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }    

    deleteBook = async (req, res, next) => {
        
        const user = JSON.parse(req.body);
        let data = await new BookService().DeleteBook({id: req.user, user})
        
        if( data?.error ){
            return res.status(400).json(HttpResponse.error(data.error));
        }
        return res.json(HttpResponse.success(data));
    }  

}

export default BookController;