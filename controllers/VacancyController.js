const Vacancy = require('../models/Vacancy.js')
const User = require('../models/User.js')


module.exports = {
    async index(req, res, next) {
        try {
            const vacancies = await Vacancy.find()
            res.json(vacancies)
        } catch (error) {
            res.json(error)
        }
    },
    async show(req, res, next) {
        try {
            const vacancy = await Vacancy.findOne({ _id: req.params.id })
            res.json(vacancy)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res, next) {

        if (req.user.role !== 'company') {
            return res.json({ error: "not permitted" });
        }

        const {
            title,
            description,
            tags,
            location,
            contact,
            companyId = req.user._id,
        } = req.body

        const tagsWithoutSpace = tags.split(',').map(tag => tag.toLowerCase().trim())

        try {
            const result = await Vacancy.create({
                title,
                description,
                tags: tagsWithoutSpace,
                location,
                companyId,
                contact
            })

            const userUpdated = await User.updateOne({ _id: companyId },
                { vacancies: [...req.user.vacancies, result] })

            return res.json(userUpdated);
        } catch (error) {
            console.log(error)
        }

    },
    async destroy(req, res, next) {
        const _id = req.params.id
        try {
            const result = await Vacancy.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "Vacancy deleted" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async update(req, res, next) {
        const _id = req.params.id
        let data = req.body
        try {
            const result = await Vacancy.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "Vacancy updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}
