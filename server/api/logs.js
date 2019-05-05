const router = require('express').Router()
const {Log, Badge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLogs = await Log.findAll()
    res.status(200).json(allLogs)
  } catch (error) {
    next(error)
  }
})

// router.get('/test', async (req, res, next) => {
//   try {
//     const diverLogs = await Log.findAll({
//       where: {
//         diverId: 1
//       },
//       include: [{model: Observation}]
//     })
//     const diverBadges = await Badge.findAll({
//       include: [
//         {
//           model: Diver,
//           where: {
//             id: 1
//           }
//         }
//       ]
//     })

//     res.json({diverLogs, diverBadges})
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  const log = await Log.findByPk(id)
  res.status(200).send(log)
})

router.get('/diver/:diverId', async (req, res, next) => {
  const diverId = Number(req.params.diverId)
  const logs = await Log.findAll({where: {diverId: diverId}})
  res.status(200).send(logs)
})
