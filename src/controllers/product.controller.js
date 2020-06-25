const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Buyer = mongoose.model('Buyer');


module.exports = {
    
    /// GET (all)
    async index(req, res) {

        const { page = 1 } = req.query;

        const products = await Product.paginate({ }, { page, limit: 10 });
        return res.json(products);
    },

    /// GET (one)
    async show(req, res) {
        const { id } = req.value.params;

        console.log('Getting product wit id:', id)
        const product = await Product.findById(id);

        if (product) { 
            return res.json(product);
        }
        else {
            return res.send(500, {message: "No record found"})
        }
    },

    /// POST
    async store(req, res) {
        const product = await Product.create(req.body);
        return res.json(product);
    },

    /// PUT
    async update(req,res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(product);
    },

    /// DELETE
    async destroy(req,res) {
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    },

    /// GET BUYERS (all)
    async indexBuyers(req, res) {

        const product = await Product.findById(req.params.id).populate('buyers');
        return res.json(product.buyers);
        
    },

    /// POST BUYER
    async storeBuyer(req, res) {

        const buyer = new Buyer(req.body);
        const product = await Product.findById(req.params.id);

        if (!product) { 
            return res.send(500, {message: "No record found"})
        }

        buyer.buyedProduct = product;
        buyer.save();

        product.buyers.push(buyer);
        product.save();

        return res.json(buyer);
    },

    /// DELETE
    async destroyBuyer(req,res) {
        
        const product = await Product.findById(req.params.id);

        if (!product) { 
            return res.send(500, {message: "No record found"})
        }

        product.buyers.remove(req.params.buyerId);
        product.save();

        return res.send();
    },

}