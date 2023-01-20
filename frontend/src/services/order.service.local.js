import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'
import { userService } from './user.service.local'

const ORDER_KEY = 'order'

export const orderService = {
    query,
    save,
    getById,
    remove
}

async function query(filterBy) {
    //todo: add filtering after checking in fiverr
    try {
        const orders = await storageService.query(ORDER_KEY)
        if (!filterBy) return orders
        const { buyerId } = filterBy
        if (buyerId) {
            const buyerOrders = orders.filter(order => order.buyer._id === buyerId)
            return buyerOrders
        }
        const { sellerId } = filterBy
        if (sellerId) {
            const sellerOrders = orders.filter(order => order.seller._id === sellerId)
            return sellerOrders
        }
    } catch (err) {
        console.log('Couldnt load orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await storageService.get(ORDER_KEY, orderId)
        return order
    } catch (err) {
        console.log('Couldnt get order', err)
        throw err
    }
}

async function remove(orderId) {
    try {
        await storageService.remove(ORDER_KEY, orderId)
    } catch (err) {
        console.log('Couldnt remove order', err)
        throw err
    }
}

async function save(order) {
    try {
        if (order._id) {
            return storageService.put(ORDER_KEY, order)
        } else {
            order.buyer = userService.getLoggedinUser()
            return storageService.post(ORDER_KEY, order)
        }
    } catch (err) {
        console.log('Couldnt save order', err)
        throw err
    }
}