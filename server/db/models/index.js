const User = require('./user')
const DiveShop = require('./diveShop')
const Log = require('./log')
const Certification = require('./certification')
const OfferedDive = require('./offeredDive')
const DivesOfferedByShops = require('./divesOfferedByShops')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Log.belongsTo(User)
User.hasMany(Log)
Certification.belongsTo(User)
User.hasMany(Certification)

OfferedDive.hasMany(Log)
Log.belongsTo(OfferedDive)

Log.belongsTo(DiveShop)
DiveShop.hasMany(Log)

DiveShop.belongsToMany(OfferedDive, { through: DivesOfferedByShops })
OfferedDive.belongsToMany(DiveShop, { through: DivesOfferedByShops })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  DiveShop,
  Log,
  Certification,
  OfferedDive,
  DivesOfferedByShops,
}
