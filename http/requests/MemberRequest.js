
const { body, validationResult } = require('express-validator')

module.exports = {
    check: [
        body('fullname').isString().isLength({ min: 2 }),
        body('birth').isString().isDate().optional(),
        body('parent').optional(),
        body('parent.id')
            .if(body('parent').exists())
            .isNumeric()
            .custom(async (value) => {
                prisma.user.findUnique({
                    where: {
                        id: parseInt(value)
                    }
                })
                    .then(user => {
                        if (!user) {
                            throw Error('Parent do not exist')
                        }
                    })
                    .catch(err => {

                    })
            }),
        function (req, res, next) {
            var errorValidation = validationResult(req);
            if (errorValidation.length > 0) {
                return res.status(500).json({
                    title: 'an error occured',
                    error: errorValidation
                });
            }
            next()
        },
    ]
}