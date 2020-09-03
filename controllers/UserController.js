const User = require('../models/User.js')

module.exports = {

    async show(req, res, next) {
        try {
            const { role, vacancies, _id, email, professionalProfile, displayName } = await User.findOne({ _id: req.user._id }).populate('professionalProfile').populate('vacancies')

            res.json({ role, vacancies, _id, email, professionalProfile, displayName })
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async destroy(req, res, next) {
        try {
            const result = await User.deleteOne({ _id: _id })
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: "User deleted" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async update(req, res, next) {
        const _id = req.user._id
        let data = req.body
        try {
            const result = await User.updateOne({ _id: _id }, data)
            if (result.nModified === 1) {
                return res.status(200).json({ message: "User updated" })
            }
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}
