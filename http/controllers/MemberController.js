const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    get: async (req, res) => {
        const recUsers = async (user) => {
            const users = await prisma.user.findMany({
                where: {
                    parentId: user.id
                }
            })
            for (const u of users) {
                u.children = []
                const children = await recUsers(u)
                u.children.push(...children)
            }
            return users
        }
        const users = await recUsers({ id: null })
        res.json(users)
    },
    show: (req, res) => {
        prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                children: true,
                parent: true
            }
        })
            .then(user => {
                res.json(user)
            })
            .catch(err => {

            })
    },
    create: async (req, res) => {
        prisma.user.create({
            data: {
                fullname: req.body.fullname,
                birth: req.body.birth,
                parentId: req.body.parent?.id
            },
        })
            .then(user => {
                res.json(user)
            })
            .catch(err => {

            })
    },
    update: async (req, res) => {
        prisma.user.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                fullname: req.body.fullname,
                birth: req.body.birth
            },
        })
            .then(user => {
                res.json(user)
            })
            .catch(err => {

            })
    },
    delete: async (req, res) => {
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })
            .then(user => {
                res.json(user)
            })
            .catch(err => {

            })
    }
}