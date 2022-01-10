const Phone = require('../models/Phone')

const errorHandler = require('../utils/errorHandler')
/*
getAll
getById
remove
create
update
*/
module.exports.getAll = async function (req, res) {
    try {
        const phones = await Phone.find({
            user: req.user.id
        })
        res.status(200).json(phones)
    } catch (e) { errorHandler(res, e) }
}

module.exports.getById = async function (req, res) {
    try {
        const phone = await Phone.findById(req.params.id)
        res.status(200).json(phone)

    } catch (e) { errorHandler(res, e) }
}

module.exports.remove = async function (req, res) {
    try {
        await Phone.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: "Телефон удален"
        })
    } catch (e) { errorHandler(res, e) }
}

module.exports.create = async function (req, res) {

    try {
        const phone = await new Phone({
            typePhone: req.body.typePhone,
            vendor: req.body.vendor,
            model: req.body.model,
            price: req.body.price,
            img: req.body.img,
            count: req.body.count,
            vendorEmail: req.body.vendorEmail,
            description: req.body.description,
        })

        phone.save()
        res.status(201).json(phone)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        console.log(req.body.typePhone)
        const updated = {
            typePhone: req.body.typePhone,
            vendor: req.body.vendor,
            model: req.body.model,
            price: req.body.price,
            img: req.body.img,
            count: req.body.count,
            vendorEmail: req.body.vendorEmail,
            description: req.body.description
        }

        const phone = await Phone.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: updated
            },
            {
                new: true
            }
        )

        res.status(200).json(phone)

    } catch (e) {
        errorHandler(res, e)
    }
}