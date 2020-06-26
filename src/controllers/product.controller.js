const mongoose = require('mongoose');
const log = require('../helpers/log.helper');

const Product = mongoose.model('Product');
const Buyer = mongoose.model('Buyer');


module.exports = {

    /// GET (all)
    async index(req, res) {

        try {

            log('Requesting for all products');

            const { page = 1 } = req.query;

            const products = await Product.paginate({}, { page, limit: 10 });
            return res.json(products);
        }
        catch (err) { return res.status(400).send({ message: err.message }) }

    },

    /// GET (one)
    async show(req, res) {

        try {

            const { id } = req.value.params;

            log('Requesting for product with id ' + id);

            const product = await Product.findById(id);

            if (product) {
                return res.json(product);
            }
            else {
                return res.status(500).send({ message: "No record found" });
            }

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// POST
    async store(req, res) {

        try {

            log('Creating new product');

            const product = await Product.create(req.body);
            return res.json(product);

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// PUT
    async update(req, res) {

        try {

            const { id } = req.value.params;

            log('Updating product with id ' + id);

            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!product) {
                return res.send(500, { message: "No record found" });
            }

            return res.json(product);

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// DELETE
    async destroy(req, res) {

        try {

            const { id } = req.value.params;

            log('Deleting product with id ' + id);

            const product = await Product.findByIdAndRemove(id);    

            if (!product) {
                return res.send(500, { message: "No record found" });
            }

            return res.send();

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// GET BUYERS (all)
    async indexBuyers(req, res) {

        try {

            const { id } = req.value.params;

            log('Requesting for buyers of product with id ' + id);

            const product = await Product.findById(id).populate('buyers');

            if (!product) {
                return res.send(500, { message: "No record found for product" });
            }

            return res.json(product.buyers);

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// POST BUYER
    async storeBuyer(req, res) {

        try {

            const { id } = req.value.params;

            const buyer = await Buyer.create(req.body);
            const product = await Product.findById(id);

            log('Creating new buyer for product with id ' + id);

            if (!product) {
                return res.status(500).send({ message: "No record found" });
            }

            buyer.save();
            product.buyers.push(buyer.id);
            product.save();

            return res.json(buyer);

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },

    /// DELETE
    async destroyBuyer(req, res) {

        try {

            const { id, buyerId } = req.value.params;

            log('Deleting buyer with id ' + buyerId + ' from product with id ' + id);

            const product = await Product.findById(id);
            const buyer = await Buyer.findById(buyerId);

            if (!product) {
                return res.status(500).send({ message: "No product record found" });
            }

            if (!buyer) {
                return res.status(500).send({ message: "No buyer record found" });
            }

            if (!product.buyers.includes(buyerId)) {
                return res.status(500).send({ message: "This buyer is not associated to this product" });
            }

            product.buyers.remove(buyerId);
            product.save();

            return res.send();

        }
        catch (err) { return res.status(400).send({ message: err.message }) }
    },
}