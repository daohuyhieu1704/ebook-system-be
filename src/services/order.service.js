import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";


import { where } from "sequelize";
import ShoppingSession from '../models/ShoppingSession.js';
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import OrderDetail from "../models/OrderDetail.js";
import OrderItem from "../models/OrderItem.js";
import PaymentDetail from "../models/PaymentDetail.js";

class OrderService {
    async AddToCart({ user, book_ID }) {
        try {
            
            let session = await ShoppingSession.findOne({where: {
                user_ID: user
            }})
            await CartItem.create({session_ID: session.id, book_ID})
            let { price } = await Book.findOne({where: { id: book_ID}})
            let total = session.total + price;
            ShoppingSession.update({ total }, {
                where: {
                id: session.id
                }
            })
            let allCartItems = await CartItem.findAll()
            return { total,  allCartItems}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error             
        }

    }

    async PurchesItems({ user, listCartItemsChecked }) {
        try {
            let { id } = await OrderDetail.create({user_ID: user, total: 0})
            for(let i = 0; i < listCartItemsChecked.length; i++){
                listCartItemsChecked[i] = await CartItem.findOne({
                    where: {id: listCartItemsChecked[i]},
                    include: {
                        required: true,
                        model: Book
                    }
                })
                console.log(listCartItemsChecked[i])
                let book = listCartItemsChecked[i].Book
                let { total } = await OrderDetail.findOne({
                    where: {id}
                })
                await OrderItem.create({
                    order_ID: id,
                    book_ID: book.id,
                })

                await OrderDetail.update({total:  total + book.price}, {
                    where: {id}
                })
            }
            let { total } = await OrderDetail.findOne({where: {id}})
            return {orderDetail_ID: id, total, listCartItemsChecked}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error             
        }

    }
    async Payment({ user, orderDetail_ID, provider, status }) {
        try {
            let { total } = await OrderDetail.findOne({
                where: { id: orderDetail_ID}
            })
            let paymentDetail = await PaymentDetail.create({
                order_ID: orderDetail_ID,
                amount: total,
                provider,
                status
            })
            await OrderDetail.update({payment_ID: paymentDetail.id}, {where:  {id: orderDetail_ID}})
            return {paymentDetail}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error             
        }

    }
    async OrderHistory({ user, pageNum}) {
        try {
            let limit = 20;
            let offset = 0 + (pageNum - 1) * limit;
            let listOrderHistory = await OrderDetail.findAndCountAll({
              offset: offset,
              limit: limit,
              order: [["created_at", "ASC"]],
              include: {
                required: true,
                model: PaymentDetail,
              }
            })
            console.log(listOrderHistory)
            // for(let i = 0; i < listOrderHistory.length; i++) {
            //     let listOrderItems = await OrderItem.findAll({
            //         where: {order_ID: listOrderHistory[i].id}
            //     }) 
            //     listOrderHistory[i] = {
            //         payment_detail: listOrderHistory[i],
            //         list_oder_items: listOrderItems
            //     }
            // }

            return {listOrderHistory}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error             
        }

    }
    
}

export default OrderService;