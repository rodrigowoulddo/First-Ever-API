const mongoose = require('mongoose');
const log = require('../helpers/log.helper')

const Product = mongoose.model('Product');
const Buyer = mongoose.model('Buyer');


module.exports = {
    
    /// GET (all)
    async index(req, res) {

        log('Requesting for all products');

        const { page = 1 } = req.query;

        const products = await Product.paginate({ }, { page, limit: 10 });
        return res.json(products);
    },

    /// GET (one)
    async show(req, res) {


        const { id } = req.value.params;

        log('Requesting for product with id ' + id);

        const product = await Product.findById(id);

        if (product) { 
            return res.json(product);
        }
        else {
            return res.status(500).send({message: "No record found"});
        }
    },

    /// POST
    async store(req, res) {
        
        log('Creating new product');

        const product = await Product.create(req.body);
        return res.json(product);
    },

    /// PUT
    async update(req,res) {

        log('Updating product with id ' + req.params.id);

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },

    /// DELETE
    async destroy(req,res) {

        log('Deleting product with id ' + req.params.id);

        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    },

    /// GET BUYERS (all)
    async indexBuyers(req, res) {

        const product = await Product.findById(req.params.id).populate('buyers');

        log('Requesting for buyers of product with id ' + product._id);

        return res.json(product.buyers);
        
    },

    /// POST BUYER
    async storeBuyer(req, res) {

        const buyer = new Buyer(req.body);
        const product = await Product.findById(req.params.id);

        log('Creating new buyer for product with id ' + product._id);

        if (!product) { 
            return res.send(500, {message: "No record found"});
        }

        buyer.buyedProduct = product;
        buyer.save();

        product.buyers.push(buyer);
        product.save();

        return res.json(buyer);
    },

    /// DELETE
    async destroyBuyer(req,res) {

        log('Deleting buyer with id ' + req.params.buyerId + ' from product with id ' + req.params.id);
        
        const product = await Product.findById(req.params.id);

        if (!product) { 
            return res.send(500, {message: "No record found"})
        }

        product.buyers.remove(req.params.buyerId);
        product.save();

        return res.send();
    },

}