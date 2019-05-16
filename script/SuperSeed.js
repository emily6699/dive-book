'use strict'

const db = require('../server/db')
const {
  Diver,
  DiveShop,
  Certification,
  OfferedDive,
  // Log,
  Badge
  // Observation
} = require('../server/db/models')
const {
  DiveShopsData,
  OfferedDivesData,
  // ObservationOddsByOfferedDiveData,
  // ObservationsData,
  DiversData,
  // ObservationHash,
  TourGuide
} = require('./data')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // await db.query(
  //   'ALTER TABLE logs ADD COLUMN geog geography(Point,4326);'
  // )
  await db.query('ALTER TABLE diveshops ADD COLUMN geog geography(Point,4326);')
  await db.query(
    'ALTER TABLE "offeredDives" ADD COLUMN geog geography(Point,4326);'
  )

  await DiveShop.LoadData(DiveShopsData)
  await Diver.LoadData(DiversData)
  await OfferedDive.LoadData(OfferedDivesData)
  // await Observation.LoadData(ObservationsData)

  const badges = await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 places'})
  ])
  console.log('Badges Load Success!')

  // const DiveBook = await Promise.all([
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-01-12", 	timeIn: "17:16:00", 	timeOut: "17:50:00", 	maxDepth: 21, 	tankPressureStart: 224, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 31, 	diverId: 8, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-01-21", 	timeIn: "08:33:00", 	timeOut: "08:48:00", 	maxDepth: 33, 	tankPressureStart: 219, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 7, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-01-26", 	timeIn: "06:59:00", 	timeOut: "07:29:00", 	maxDepth: 33, 	tankPressureStart: 228, 	tankPressureEnd: 18, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 15, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2015-03-11", 	timeIn: "07:38:00", 	timeOut: "08:09:00", 	maxDepth: 21, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 15, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-03-23", 	timeIn: "18:59:00", 	timeOut: "19:26:00", 	maxDepth: 14, 	tankPressureStart: 221, 	tankPressureEnd: 32, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 15, 	diverId: 4, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-04-04", 	timeIn: "14:09:00", 	timeOut: "14:35:00", 	maxDepth: 38, 	tankPressureStart: 219, 	tankPressureEnd: 46, 	tankType: "Steel", 	beltWeight: 24, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 7, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2015-04-08", 	timeIn: "07:59:00", 	timeOut: "08:18:00", 	maxDepth: 27, 	tankPressureStart: 211, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 13, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-04-08", 	timeIn: "11:28:00", 	timeOut: "11:58:00", 	maxDepth: 33, 	tankPressureStart: 215, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 2, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2015-04-10", 	timeIn: "13:47:00", 	timeOut: "14:11:00", 	maxDepth: 27, 	tankPressureStart: 232, 	tankPressureEnd: 60, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 3, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-04-25", 	timeIn: "10:13:00", 	timeOut: "10:38:00", 	maxDepth: 19, 	tankPressureStart: 213, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 6, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-04-26", 	timeIn: "09:00:00", 	timeOut: "09:20:00", 	maxDepth: 31, 	tankPressureStart: 218, 	tankPressureEnd: 60, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 14, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2015-04-29", 	timeIn: "14:21:00", 	timeOut: "14:46:00", 	maxDepth: 22, 	tankPressureStart: 230, 	tankPressureEnd: 54, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 11, 	offeredDiveId: 2, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2015-05-03", 	timeIn: "08:04:00", 	timeOut: "08:33:00", 	maxDepth: 23, 	tankPressureStart: 217, 	tankPressureEnd: 24, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 14, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-05-15", 	timeIn: "09:13:00", 	timeOut: "09:42:00", 	maxDepth: 30, 	tankPressureStart: 220, 	tankPressureEnd: 17, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 1, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2015-05-25", 	timeIn: "12:21:00", 	timeOut: "12:41:00", 	maxDepth: 33, 	tankPressureStart: 230, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 10, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-05-27", 	timeIn: "09:58:00", 	timeOut: "10:28:00", 	maxDepth: 29, 	tankPressureStart: 221, 	tankPressureEnd: 21, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 2, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2015-05-29", 	timeIn: "05:45:00", 	timeOut: "06:10:00", 	maxDepth: 24, 	tankPressureStart: 225, 	tankPressureEnd: 49, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 17, 	diverId: 16, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-06-18", 	timeIn: "12:48:00", 	timeOut: "13:12:00", 	maxDepth: 33, 	tankPressureStart: 223, 	tankPressureEnd: 71, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 4, 	diverId: 2, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2015-06-21", 	timeIn: "04:57:00", 	timeOut: "05:19:00", 	maxDepth: 23, 	tankPressureStart: 232, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 12, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2015-06-25", 	timeIn: "20:30:00", 	timeOut: "21:08:00", 	maxDepth: 17, 	tankPressureStart: 221, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 1, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2015-07-04", 	timeIn: "10:32:00", 	timeOut: "10:59:00", 	maxDepth: 15, 	tankPressureStart: 215, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Other", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 1, 	diverId: 8, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2015-07-14", 	timeIn: "05:46:00", 	timeOut: "06:17:00", 	maxDepth: 31, 	tankPressureStart: 225, 	tankPressureEnd: 29, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 8, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2015-07-17", 	timeIn: "06:31:00", 	timeOut: "06:58:00", 	maxDepth: 31, 	tankPressureStart: 236, 	tankPressureEnd: 56, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 10, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2015-07-21", 	timeIn: "01:54:00", 	timeOut: "02:34:00", 	maxDepth: 24, 	tankPressureStart: 230, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 9, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-08-08", 	timeIn: "21:44:00", 	timeOut: "22:22:00", 	maxDepth: 17, 	tankPressureStart: 220, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 15, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-08-22", 	timeIn: "21:24:00", 	timeOut: "21:55:00", 	maxDepth: 17, 	tankPressureStart: 233, 	tankPressureEnd: 37, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 7, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2015-08-23", 	timeIn: "05:15:00", 	timeOut: "05:44:00", 	maxDepth: 30, 	tankPressureStart: 229, 	tankPressureEnd: 54, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 17, 	diverId: 8, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2015-08-31", 	timeIn: "14:24:00", 	timeOut: "14:54:00", 	maxDepth: 29, 	tankPressureStart: 233, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 3, 	offeredDiveId: 13, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2015-09-01", 	timeIn: "00:54:00", 	timeOut: "01:29:00", 	maxDepth: 18, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 15, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2015-09-01", 	timeIn: "11:22:00", 	timeOut: "12:01:00", 	maxDepth: 36, 	tankPressureStart: 219, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 1, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2015-09-21", 	timeIn: "21:44:00", 	timeOut: "22:09:00", 	maxDepth: 24, 	tankPressureStart: 211, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 30, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 4, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2015-09-23", 	timeIn: "16:44:00", 	timeOut: "17:06:00", 	maxDepth: 30, 	tankPressureStart: 221, 	tankPressureEnd: 88, 	tankType: "Aluminum", 	beltWeight: 28, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 8, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2015-09-23", 	timeIn: "13:13:00", 	timeOut: "13:47:00", 	maxDepth: 17, 	tankPressureStart: 237, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 17, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2015-10-28", 	timeIn: "14:17:00", 	timeOut: "14:56:00", 	maxDepth: 19, 	tankPressureStart: 223, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 14, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2015-11-05", 	timeIn: "15:35:00", 	timeOut: "16:08:00", 	maxDepth: 31, 	tankPressureStart: 213, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 9, 	offeredDiveId: 2, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2015-11-27", 	timeIn: "13:32:00", 	timeOut: "14:11:00", 	maxDepth: 23, 	tankPressureStart: 213, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 15, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2015-12-06", 	timeIn: "15:54:00", 	timeOut: "16:21:00", 	maxDepth: 27, 	tankPressureStart: 227, 	tankPressureEnd: 56, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 3, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2015-12-08", 	timeIn: "18:11:00", 	timeOut: "18:37:00", 	maxDepth: 26, 	tankPressureStart: 224, 	tankPressureEnd: 51, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Other", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 16, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2015-12-17", 	timeIn: "16:42:00", 	timeOut: "17:12:00", 	maxDepth: 30, 	tankPressureStart: 230, 	tankPressureEnd: 49, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 14, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2015-12-26", 	timeIn: "13:52:00", 	timeOut: "14:14:00", 	maxDepth: 25, 	tankPressureStart: 228, 	tankPressureEnd: 67, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 9, 	diverId: 6, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-01-09", 	timeIn: "10:30:00", 	timeOut: "10:57:00", 	maxDepth: 29, 	tankPressureStart: 213, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 13, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2016-01-13", 	timeIn: "06:32:00", 	timeOut: "07:09:00", 	maxDepth: 34, 	tankPressureStart: 204, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 6, 	diverId: 11, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-01-17", 	timeIn: "13:22:00", 	timeOut: "13:45:00", 	maxDepth: 22, 	tankPressureStart: 232, 	tankPressureEnd: 81, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 3, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-01-20", 	timeIn: "03:59:00", 	timeOut: "04:17:00", 	maxDepth: 25, 	tankPressureStart: 213, 	tankPressureEnd: 74, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 9, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-02-03", 	timeIn: "03:58:00", 	timeOut: "04:21:00", 	maxDepth: 29, 	tankPressureStart: 233, 	tankPressureEnd: 81, 	tankType: "Steel", 	beltWeight: 21, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 7, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2016-02-09", 	timeIn: "00:20:00", 	timeOut: "00:41:00", 	maxDepth: 31, 	tankPressureStart: 216, 	tankPressureEnd: 81, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 9, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-02-19", 	timeIn: "01:18:00", 	timeOut: "01:42:00", 	maxDepth: 13, 	tankPressureStart: 220, 	tankPressureEnd: 68, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 13, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-03-14", 	timeIn: "07:31:00", 	timeOut: "07:56:00", 	maxDepth: 23, 	tankPressureStart: 228, 	tankPressureEnd: 70, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 6, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-04-05", 	timeIn: "10:58:00", 	timeOut: "11:28:00", 	maxDepth: 31, 	tankPressureStart: 208, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 17, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2016-04-07", 	timeIn: "09:44:00", 	timeOut: "10:21:00", 	maxDepth: 18, 	tankPressureStart: 224, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 6, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-04-14", 	timeIn: "17:53:00", 	timeOut: "18:25:00", 	maxDepth: 33, 	tankPressureStart: 226, 	tankPressureEnd: 33, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 1, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2016-04-18", 	timeIn: "00:57:00", 	timeOut: "01:50:00", 	maxDepth: 26, 	tankPressureStart: 219, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 8, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-04-18", 	timeIn: "18:05:00", 	timeOut: "18:22:00", 	maxDepth: 29, 	tankPressureStart: 218, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 5, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-05-05", 	timeIn: "16:24:00", 	timeOut: "16:50:00", 	maxDepth: 38, 	tankPressureStart: 208, 	tankPressureEnd: 51, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Other", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 2, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-05-13", 	timeIn: "21:22:00", 	timeOut: "21:58:00", 	maxDepth: 38, 	tankPressureStart: 229, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 7, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-05-26", 	timeIn: "13:58:00", 	timeOut: "14:44:00", 	maxDepth: 17, 	tankPressureStart: 229, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 15, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-05-27", 	timeIn: "01:18:00", 	timeOut: "01:51:00", 	maxDepth: 16, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 7, 	diverId: 11, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-06-02", 	timeIn: "13:53:00", 	timeOut: "14:32:00", 	maxDepth: 25, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 7, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-06-13", 	timeIn: "07:33:00", 	timeOut: "08:11:00", 	maxDepth: 31, 	tankPressureStart: 223, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 8, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-06-27", 	timeIn: "07:21:00", 	timeOut: "07:41:00", 	maxDepth: 32, 	tankPressureStart: 215, 	tankPressureEnd: 74, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 3, 	diverId: 17, 	offeredDiveId: 2, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2016-06-28", 	timeIn: "06:18:00", 	timeOut: "07:04:00", 	maxDepth: 23, 	tankPressureStart: 222, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 17, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2016-07-15", 	timeIn: "09:02:00", 	timeOut: "09:36:00", 	maxDepth: 24, 	tankPressureStart: 216, 	tankPressureEnd: 41, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 7, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2016-07-31", 	timeIn: "10:15:00", 	timeOut: "10:41:00", 	maxDepth: 28, 	tankPressureStart: 209, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 4, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-08-06", 	timeIn: "11:25:00", 	timeOut: "11:54:00", 	maxDepth: 29, 	tankPressureStart: 225, 	tankPressureEnd: 50, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 13, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-09-12", 	timeIn: "16:36:00", 	timeOut: "17:00:00", 	maxDepth: 33, 	tankPressureStart: 214, 	tankPressureEnd: 96, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 8, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2016-09-14", 	timeIn: "20:13:00", 	timeOut: "20:47:00", 	maxDepth: 29, 	tankPressureStart: 211, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 11, 	offeredDiveId: 3, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2016-09-14", 	timeIn: "09:04:00", 	timeOut: "09:32:00", 	maxDepth: 21, 	tankPressureStart: 223, 	tankPressureEnd: 36, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 5, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-09-15", 	timeIn: "10:27:00", 	timeOut: "11:03:00", 	maxDepth: 38, 	tankPressureStart: 229, 	tankPressureEnd: 23, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 9, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-09-24", 	timeIn: "08:17:00", 	timeOut: "08:59:00", 	maxDepth: 28, 	tankPressureStart: 212, 	tankPressureEnd: 16, 	tankType: "Steel", 	beltWeight: 21, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 8, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2016-10-04", 	timeIn: "03:39:00", 	timeOut: "04:10:00", 	maxDepth: 27, 	tankPressureStart: 230, 	tankPressureEnd: 43, 	tankType: "Steel", 	beltWeight: 21, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 4, 	offeredDiveId: 3, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-10-05", 	timeIn: "05:07:00", 	timeOut: "05:46:00", 	maxDepth: 20, 	tankPressureStart: 206, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 17, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-10-06", 	timeIn: "14:28:00", 	timeOut: "14:48:00", 	maxDepth: 22, 	tankPressureStart: 212, 	tankPressureEnd: 88, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 1, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-10-08", 	timeIn: "02:57:00", 	timeOut: "03:26:00", 	maxDepth: 20, 	tankPressureStart: 222, 	tankPressureEnd: 56, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 14, 	offeredDiveId: 2, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-10-11", 	timeIn: "13:15:00", 	timeOut: "13:50:00", 	maxDepth: 30, 	tankPressureStart: 201, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 4, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2016-10-19", 	timeIn: "02:45:00", 	timeOut: "03:20:00", 	maxDepth: 30, 	tankPressureStart: 222, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 9, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-10-22", 	timeIn: "12:45:00", 	timeOut: "13:30:00", 	maxDepth: 21, 	tankPressureStart: 233, 	tankPressureEnd: 34, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 8, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2016-10-25", 	timeIn: "05:54:00", 	timeOut: "06:38:00", 	maxDepth: 16, 	tankPressureStart: 209, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 15, 	offeredDiveId: 13, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2016-11-11", 	timeIn: "13:25:00", 	timeOut: "13:57:00", 	maxDepth: 38, 	tankPressureStart: 209, 	tankPressureEnd: 52, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 15, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-11-12", 	timeIn: "03:41:00", 	timeOut: "04:11:00", 	maxDepth: 28, 	tankPressureStart: 211, 	tankPressureEnd: 39, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 22, 	diverId: 13, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-11-12", 	timeIn: "04:06:00", 	timeOut: "05:00:00", 	maxDepth: 34, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 8, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2016-11-16", 	timeIn: "10:07:00", 	timeOut: "10:46:00", 	maxDepth: 32, 	tankPressureStart: 222, 	tankPressureEnd: 40, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 3, 	diverId: 15, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2016-11-28", 	timeIn: "21:30:00", 	timeOut: "22:08:00", 	maxDepth: 24, 	tankPressureStart: 226, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 29, 	diverId: 3, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-12-03", 	timeIn: "07:26:00", 	timeOut: "08:10:00", 	maxDepth: 23, 	tankPressureStart: 214, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 14, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2016-12-03", 	timeIn: "18:22:00", 	timeOut: "18:46:00", 	maxDepth: 38, 	tankPressureStart: 206, 	tankPressureEnd: 54, 	tankType: "Steel", 	beltWeight: 29, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 4, 	diverId: 10, 	offeredDiveId: 13, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-12-06", 	timeIn: "04:24:00", 	timeOut: "05:27:00", 	maxDepth: 21, 	tankPressureStart: 227, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 22, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 8, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-12-09", 	timeIn: "19:30:00", 	timeOut: "20:00:00", 	maxDepth: 38, 	tankPressureStart: 215, 	tankPressureEnd: 25, 	tankType: "Aluminum", 	beltWeight: 19, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 5, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-12-16", 	timeIn: "09:56:00", 	timeOut: "10:30:00", 	maxDepth: 25, 	tankPressureStart: 229, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 1, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-12-25", 	timeIn: "08:10:00", 	timeOut: "08:55:00", 	maxDepth: 19, 	tankPressureStart: 215, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 23, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 2, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2016-12-26", 	timeIn: "20:24:00", 	timeOut: "20:48:00", 	maxDepth: 15, 	tankPressureStart: 235, 	tankPressureEnd: 109, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 7, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-12-29", 	timeIn: "20:49:00", 	timeOut: "21:36:00", 	maxDepth: 16, 	tankPressureStart: 218, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 5, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2017-01-19", 	timeIn: "13:15:00", 	timeOut: "13:55:00", 	maxDepth: 38, 	tankPressureStart: 213, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 3, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2017-01-21", 	timeIn: "08:10:00", 	timeOut: "09:00:00", 	maxDepth: 25, 	tankPressureStart: 230, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 8, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2017-01-22", 	timeIn: "07:27:00", 	timeOut: "08:08:00", 	maxDepth: 33, 	tankPressureStart: 211, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 26, 	diverId: 4, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-01-26", 	timeIn: "14:49:00", 	timeOut: "15:37:00", 	maxDepth: 22, 	tankPressureStart: 225, 	tankPressureEnd: 52, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 21, 	diverId: 8, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-01-26", 	timeIn: "10:21:00", 	timeOut: "11:03:00", 	maxDepth: 19, 	tankPressureStart: 219, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 4, 	offeredDiveId: 3, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-01-29", 	timeIn: "14:44:00", 	timeOut: "15:08:00", 	maxDepth: 28, 	tankPressureStart: 229, 	tankPressureEnd: 67, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 12, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2017-02-02", 	timeIn: "07:34:00", 	timeOut: "08:07:00", 	maxDepth: 24, 	tankPressureStart: 215, 	tankPressureEnd: 16, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 3, 	diverId: 10, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2017-02-04", 	timeIn: "04:43:00", 	timeOut: "05:25:00", 	maxDepth: 38, 	tankPressureStart: 227, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 17, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-02-09", 	timeIn: "03:09:00", 	timeOut: "03:52:00", 	maxDepth: 23, 	tankPressureStart: 219, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 17, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-02-15", 	timeIn: "19:13:00", 	timeOut: "19:53:00", 	maxDepth: 18, 	tankPressureStart: 220, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 3, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2017-02-20", 	timeIn: "00:02:00", 	timeOut: "00:40:00", 	maxDepth: 19, 	tankPressureStart: 230, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 30, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 17, 	offeredDiveId: 13, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	isVerified: true, 	date: "2017-02-23", 	timeIn: "17:49:00", 	timeOut: "18:21:00", 	maxDepth: 21, 	tankPressureStart: 225, 	tankPressureEnd: 42, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 11, 	offeredDiveId: 21, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-03-03", 	timeIn: "04:15:00", 	timeOut: "04:41:00", 	maxDepth: 36, 	tankPressureStart: 225, 	tankPressureEnd: 136, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 8, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-03-16", 	timeIn: "18:52:00", 	timeOut: "19:29:00", 	maxDepth: 27, 	tankPressureStart: 216, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 17, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2017-03-22", 	timeIn: "18:39:00", 	timeOut: "19:24:00", 	maxDepth: 28, 	tankPressureStart: 228, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 19, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 4, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-05-15", 	timeIn: "08:05:00", 	timeOut: "08:32:00", 	maxDepth: 13, 	tankPressureStart: 224, 	tankPressureEnd: 53, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 16, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-05-19", 	timeIn: "20:47:00", 	timeOut: "21:09:00", 	maxDepth: 30, 	tankPressureStart: 214, 	tankPressureEnd: 88, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 6, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-05-21", 	timeIn: "01:20:00", 	timeOut: "01:51:00", 	maxDepth: 23, 	tankPressureStart: 222, 	tankPressureEnd: 45, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 5, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-05-24", 	timeIn: "00:34:00", 	timeOut: "01:13:00", 	maxDepth: 17, 	tankPressureStart: 212, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 11, 	diverId: 2, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-05-31", 	timeIn: "17:55:00", 	timeOut: "18:29:00", 	maxDepth: 17, 	tankPressureStart: 217, 	tankPressureEnd: 32, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 11, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-06-01", 	timeIn: "03:54:00", 	timeOut: "04:27:00", 	maxDepth: 19, 	tankPressureStart: 230, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 31, 	diverId: 2, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-06-08", 	timeIn: "10:18:00", 	timeOut: "10:56:00", 	maxDepth: 19, 	tankPressureStart: 215, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 8, 	diverId: 16, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2017-06-17", 	timeIn: "13:47:00", 	timeOut: "14:16:00", 	maxDepth: 30, 	tankPressureStart: 205, 	tankPressureEnd: 55, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 14, 	diverId: 1, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-06-24", 	timeIn: "13:16:00", 	timeOut: "14:00:00", 	maxDepth: 19, 	tankPressureStart: 241, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 3, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2017-07-01", 	timeIn: "08:39:00", 	timeOut: "09:17:00", 	maxDepth: 26, 	tankPressureStart: 216, 	tankPressureEnd: 30, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 23, 	diverId: 2, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-07-11", 	timeIn: "11:23:00", 	timeOut: "12:20:00", 	maxDepth: 28, 	tankPressureStart: 220, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 11, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-07-12", 	timeIn: "06:16:00", 	timeOut: "07:05:00", 	maxDepth: 32, 	tankPressureStart: 215, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 28, 	diverId: 2, 	offeredDiveId: 3, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2017-07-28", 	timeIn: "10:02:00", 	timeOut: "10:48:00", 	maxDepth: 30, 	tankPressureStart: 223, 	tankPressureEnd: 20, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 17, 	offeredDiveId: 18, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-08-08", 	timeIn: "19:13:00", 	timeOut: "19:46:00", 	maxDepth: 21, 	tankPressureStart: 221, 	tankPressureEnd: 51, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 14, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-08-10", 	timeIn: "20:32:00", 	timeOut: "21:06:00", 	maxDepth: 34, 	tankPressureStart: 235, 	tankPressureEnd: 68, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 1, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2017-08-30", 	timeIn: "18:05:00", 	timeOut: "18:33:00", 	maxDepth: 34, 	tankPressureStart: 224, 	tankPressureEnd: 72, 	tankType: "Aluminum", 	beltWeight: 24, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 11, 	diverId: 13, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2017-09-06", 	timeIn: "06:47:00", 	timeOut: "07:18:00", 	maxDepth: 25, 	tankPressureStart: 218, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 6, 	offeredDiveId: 13, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-09-09", 	timeIn: "17:23:00", 	timeOut: "18:09:00", 	maxDepth: 17, 	tankPressureStart: 222, 	tankPressureEnd: 19, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 2, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-09-16", 	timeIn: "00:59:00", 	timeOut: "01:30:00", 	maxDepth: 23, 	tankPressureStart: 220, 	tankPressureEnd: 76, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 4, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2017-10-16", 	timeIn: "19:53:00", 	timeOut: "20:38:00", 	maxDepth: 26, 	tankPressureStart: 213, 	tankPressureEnd: 24, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 2, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-10-16", 	timeIn: "13:14:00", 	timeOut: "13:52:00", 	maxDepth: 22, 	tankPressureStart: 225, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 15, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-10-20", 	timeIn: "14:19:00", 	timeOut: "14:51:00", 	maxDepth: 26, 	tankPressureStart: 222, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 9, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2017-11-03", 	timeIn: "04:09:00", 	timeOut: "04:44:00", 	maxDepth: 24, 	tankPressureStart: 229, 	tankPressureEnd: 29, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 16, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-11-04", 	timeIn: "06:52:00", 	timeOut: "07:37:00", 	maxDepth: 10, 	tankPressureStart: 224, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 2, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-11-06", 	timeIn: "14:48:00", 	timeOut: "15:30:00", 	maxDepth: 37, 	tankPressureStart: 228, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 5, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-11-19", 	timeIn: "15:11:00", 	timeOut: "15:53:00", 	maxDepth: 22, 	tankPressureStart: 228, 	tankPressureEnd: 22, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 14, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-11-25", 	timeIn: "07:49:00", 	timeOut: "08:24:00", 	maxDepth: 36, 	tankPressureStart: 212, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 12, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-11-30", 	timeIn: "00:11:00", 	timeOut: "00:43:00", 	maxDepth: 19, 	tankPressureStart: 217, 	tankPressureEnd: 82, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 17, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-12-05", 	timeIn: "00:49:00", 	timeOut: "01:22:00", 	maxDepth: 15, 	tankPressureStart: 204, 	tankPressureEnd: 65, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 15, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2017-12-05", 	timeIn: "12:19:00", 	timeOut: "12:57:00", 	maxDepth: 21, 	tankPressureStart: 236, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 14, 	diverId: 6, 	offeredDiveId: 1, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-12-14", 	timeIn: "19:37:00", 	timeOut: "20:07:00", 	maxDepth: 24, 	tankPressureStart: 227, 	tankPressureEnd: 64, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 16, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-12-17", 	timeIn: "18:56:00", 	timeOut: "19:38:00", 	maxDepth: 29, 	tankPressureStart: 227, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 29, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 5, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-12-18", 	timeIn: "16:25:00", 	timeOut: "17:01:00", 	maxDepth: 33, 	tankPressureStart: 222, 	tankPressureEnd: 85, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 2, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-12-23", 	timeIn: "12:55:00", 	timeOut: "13:30:00", 	maxDepth: 24, 	tankPressureStart: 211, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 12, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2018-01-12", 	timeIn: "07:03:00", 	timeOut: "07:30:00", 	maxDepth: 18, 	tankPressureStart: 220, 	tankPressureEnd: 94, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 7, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-01-19", 	timeIn: "01:29:00", 	timeOut: "02:07:00", 	maxDepth: 25, 	tankPressureStart: 226, 	tankPressureEnd: 30, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 16, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-01-23", 	timeIn: "00:03:00", 	timeOut: "00:14:00", 	maxDepth: 23, 	tankPressureStart: 223, 	tankPressureEnd: 109, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 16, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-01-27", 	timeIn: "19:03:00", 	timeOut: "19:40:00", 	maxDepth: 23, 	tankPressureStart: 221, 	tankPressureEnd: 57, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 4, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-01-28", 	timeIn: "06:13:00", 	timeOut: "06:43:00", 	maxDepth: 25, 	tankPressureStart: 229, 	tankPressureEnd: 82, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 5, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-02-03", 	timeIn: "01:37:00", 	timeOut: "02:15:00", 	maxDepth: 31, 	tankPressureStart: 227, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 5, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-02-07", 	timeIn: "08:25:00", 	timeOut: "08:56:00", 	maxDepth: 22, 	tankPressureStart: 228, 	tankPressureEnd: 104, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 17, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-02-11", 	timeIn: "09:42:00", 	timeOut: "10:22:00", 	maxDepth: 35, 	tankPressureStart: 229, 	tankPressureEnd: 43, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 3, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2018-02-16", 	timeIn: "04:09:00", 	timeOut: "04:55:00", 	maxDepth: 23, 	tankPressureStart: 215, 	tankPressureEnd: 22, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 23, 	diverId: 4, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2018-02-18", 	timeIn: "17:25:00", 	timeOut: "18:06:00", 	maxDepth: 38, 	tankPressureStart: 228, 	tankPressureEnd: 37, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 16, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2018-03-02", 	timeIn: "05:13:00", 	timeOut: "05:50:00", 	maxDepth: 7, 	tankPressureStart: 223, 	tankPressureEnd: 51, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 1, 	offeredDiveId: 2, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2018-03-06", 	timeIn: "10:25:00", 	timeOut: "10:43:00", 	maxDepth: 10, 	tankPressureStart: 222, 	tankPressureEnd: 88, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 12, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-03-07", 	timeIn: "08:50:00", 	timeOut: "09:28:00", 	maxDepth: 31, 	tankPressureStart: 217, 	tankPressureEnd: 31, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 6, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2018-03-11", 	timeIn: "00:45:00", 	timeOut: "01:20:00", 	maxDepth: 29, 	tankPressureStart: 215, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 6, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-03-22", 	timeIn: "06:31:00", 	timeOut: "07:16:00", 	maxDepth: 37, 	tankPressureStart: 218, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 21, 	diverId: 11, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-03-26", 	timeIn: "09:02:00", 	timeOut: "09:46:00", 	maxDepth: 21, 	tankPressureStart: 221, 	tankPressureEnd: 16, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 11, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2018-03-26", 	timeIn: "08:09:00", 	timeOut: "08:35:00", 	maxDepth: 25, 	tankPressureStart: 206, 	tankPressureEnd: 107, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 17, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	isVerified: true, 	date: "2018-03-29", 	timeIn: "11:37:00", 	timeOut: "12:40:00", 	maxDepth: 36, 	tankPressureStart: 225, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 15, 	offeredDiveId: 21, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2018-04-05", 	timeIn: "06:19:00", 	timeOut: "06:55:00", 	maxDepth: 19, 	tankPressureStart: 209, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 21, 	diverId: 10, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-05-03", 	timeIn: "13:41:00", 	timeOut: "14:15:00", 	maxDepth: 11, 	tankPressureStart: 215, 	tankPressureEnd: 65, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 1, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-05-11", 	timeIn: "19:58:00", 	timeOut: "20:54:00", 	maxDepth: 20, 	tankPressureStart: 218, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 14, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-07-02", 	timeIn: "07:00:00", 	timeOut: "07:30:00", 	maxDepth: 26, 	tankPressureStart: 221, 	tankPressureEnd: 101, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 17, 	diverId: 4, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-07-02", 	timeIn: "07:25:00", 	timeOut: "08:10:00", 	maxDepth: 38, 	tankPressureStart: 214, 	tankPressureEnd: 43, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 20, 	diverId: 4, 	offeredDiveId: 18, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2018-07-09", 	timeIn: "15:15:00", 	timeOut: "15:59:00", 	maxDepth: 26, 	tankPressureStart: 216, 	tankPressureEnd: 73, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 8, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-08-11", 	timeIn: "16:58:00", 	timeOut: "17:45:00", 	maxDepth: 21, 	tankPressureStart: 216, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 10, 	offeredDiveId: 6, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2018-08-15", 	timeIn: "10:29:00", 	timeOut: "10:55:00", 	maxDepth: 14, 	tankPressureStart: 223, 	tankPressureEnd: 89, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 13, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2018-08-23", 	timeIn: "13:18:00", 	timeOut: "13:57:00", 	maxDepth: 33, 	tankPressureStart: 217, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 12, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-09-15", 	timeIn: "19:14:00", 	timeOut: "19:55:00", 	maxDepth: 20, 	tankPressureStart: 228, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 29, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 10, 	diverId: 9, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2018-09-25", 	timeIn: "07:02:00", 	timeOut: "07:57:00", 	maxDepth: 29, 	tankPressureStart: 210, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 17, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2018-09-26", 	timeIn: "07:44:00", 	timeOut: "08:19:00", 	maxDepth: 31, 	tankPressureStart: 227, 	tankPressureEnd: 64, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 9, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-10-12", 	timeIn: "16:31:00", 	timeOut: "17:26:00", 	maxDepth: 15, 	tankPressureStart: 221, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 11, 	offeredDiveId: 18, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-10-14", 	timeIn: "19:09:00", 	timeOut: "20:04:00", 	maxDepth: 22, 	tankPressureStart: 212, 	tankPressureEnd: 24, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 17, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2018-10-14", 	timeIn: "02:04:00", 	timeOut: "02:40:00", 	maxDepth: 28, 	tankPressureStart: 225, 	tankPressureEnd: 39, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 12, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-10-22", 	timeIn: "07:01:00", 	timeOut: "07:25:00", 	maxDepth: 35, 	tankPressureStart: 229, 	tankPressureEnd: 155, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 8, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-11-12", 	timeIn: "06:00:00", 	timeOut: "06:49:00", 	maxDepth: 23, 	tankPressureStart: 226, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 13, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2018-11-17", 	timeIn: "16:26:00", 	timeOut: "17:06:00", 	maxDepth: 8, 	tankPressureStart: 230, 	tankPressureEnd: 53, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 20, 	diverId: 14, 	offeredDiveId: 16, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2018-11-27", 	timeIn: "18:39:00", 	timeOut: "19:16:00", 	maxDepth: 32, 	tankPressureStart: 241, 	tankPressureEnd: 85, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 1, 	offeredDiveId: 17, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-12-01", 	timeIn: "04:49:00", 	timeOut: "05:04:00", 	maxDepth: 25, 	tankPressureStart: 210, 	tankPressureEnd: 123, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 9, 	offeredDiveId: 18, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-12-03", 	timeIn: "00:54:00", 	timeOut: "01:28:00", 	maxDepth: 25, 	tankPressureStart: 216, 	tankPressureEnd: 66, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 16, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-12-21", 	timeIn: "13:29:00", 	timeOut: "13:59:00", 	maxDepth: 27, 	tankPressureStart: 220, 	tankPressureEnd: 94, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 14, 	offeredDiveId: 18, 	diveshopId: 7	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-12-28", 	timeIn: "12:20:00", 	timeOut: "12:55:00", 	maxDepth: 36, 	tankPressureStart: 219, 	tankPressureEnd: 72, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 1, 	diverId: 16, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-12-29", 	timeIn: "09:06:00", 	timeOut: "09:42:00", 	maxDepth: 17, 	tankPressureStart: 221, 	tankPressureEnd: 62, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 5, 	diverId: 7, 	offeredDiveId: 7, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2019-01-01", 	timeIn: "15:02:00", 	timeOut: "16:01:00", 	maxDepth: 19, 	tankPressureStart: 216, 	tankPressureEnd: 43, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 8, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-01-05", 	timeIn: "19:12:00", 	timeOut: "19:54:00", 	maxDepth: 38, 	tankPressureStart: 209, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 22, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 10, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2019-01-08", 	timeIn: "14:32:00", 	timeOut: "15:02:00", 	maxDepth: 33, 	tankPressureStart: 221, 	tankPressureEnd: 101, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 1, 	offeredDiveId: 15, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2019-01-11", 	timeIn: "16:12:00", 	timeOut: "16:48:00", 	maxDepth: 35, 	tankPressureStart: 218, 	tankPressureEnd: 74, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 16, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-01-27", 	timeIn: "19:38:00", 	timeOut: "20:17:00", 	maxDepth: 32, 	tankPressureStart: 228, 	tankPressureEnd: 55, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 5, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2019-02-03", 	timeIn: "13:18:00", 	timeOut: "14:08:00", 	maxDepth: 36, 	tankPressureStart: 225, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 15, 	offeredDiveId: 9, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	isVerified: true, 	date: "2019-02-05", 	timeIn: "13:10:00", 	timeOut: "14:07:00", 	maxDepth: 30, 	tankPressureStart: 227, 	tankPressureEnd: 22, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 15, 	offeredDiveId: 21, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2019-02-05", 	timeIn: "06:24:00", 	timeOut: "07:16:00", 	maxDepth: 28, 	tankPressureStart: 213, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 14, 	offeredDiveId: 4, 	diveshopId: 3	}),
  // Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El Sheikh, Egypt", 	isVerified: true, 	date: "2019-02-11", 	timeIn: "00:39:00", 	timeOut: "01:39:00", 	maxDepth: 25, 	tankPressureStart: 211, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 14, 	offeredDiveId: 5, 	diveshopId: 4	}),
  // Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2019-02-16", 	timeIn: "20:08:00", 	timeOut: "21:09:00", 	maxDepth: 19, 	tankPressureStart: 213, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 15, 	offeredDiveId: 12, 	diveshopId: 1	}),
  // Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2019-02-27", 	timeIn: "20:49:00", 	timeOut: "21:30:00", 	maxDepth: 20, 	tankPressureStart: 218, 	tankPressureEnd: 46, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 9, 	offeredDiveId: 10, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2019-03-06", 	timeIn: "05:11:00", 	timeOut: "05:42:00", 	maxDepth: 21, 	tankPressureStart: 211, 	tankPressureEnd: 59, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 10, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Bloody Bay Wall", 	location: "Little Cayman, Cayman Islands", 	isVerified: true, 	date: "2019-03-18", 	timeIn: "00:53:00", 	timeOut: "01:42:00", 	maxDepth: 20, 	tankPressureStart: 221, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 11, 	diverId: 2, 	offeredDiveId: 21, 	diveshopId: 2	}),
  // Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2019-03-22", 	timeIn: "11:47:00", 	timeOut: "12:41:00", 	maxDepth: 25, 	tankPressureStart: 223, 	tankPressureEnd: 47, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 17, 	offeredDiveId: 11, 	diveshopId: 6	}),
  // Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-03-27", 	timeIn: "09:44:00", 	timeOut: "10:16:00", 	maxDepth: 12, 	tankPressureStart: 233, 	tankPressureEnd: 84, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 8, 	diverId: 10, 	offeredDiveId: 8, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-03-29", 	timeIn: "20:27:00", 	timeOut: "21:29:00", 	maxDepth: 14, 	tankPressureStart: 202, 	tankPressureEnd: 29, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 8, 	offeredDiveId: 14, 	diveshopId: 5	}),
  // Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2019-04-08", 	timeIn: "20:03:00", 	timeOut: "20:59:00", 	maxDepth: 21, 	tankPressureStart: 210, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Other", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 5, 	diverId: 9, 	offeredDiveId: 19, 	diveshopId: 8	}),
  // Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2019-04-10", 	timeIn: "01:27:00", 	timeOut: "02:12:00", 	maxDepth: 19, 	tankPressureStart: 214, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 3, 	diverId: 11, 	offeredDiveId: 20, 	diveshopId: 9	}),
  // Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2019-04-15", 	timeIn: "09:07:00", 	timeOut: "09:55:00", 	maxDepth: 24, 	tankPressureStart: 214, 	tankPressureEnd: 15, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 24, 	diverId: 5, 	offeredDiveId: 13, 	diveshopId: 2	}),	])

  // console.log(`DiveBook Load Success! ${DiveBook.length} logs available`)

  // const AddressBook = await Promise.all([	db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 1'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 2'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 3'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 4'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 5'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 6'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 7'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 8'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 9'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 10'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 11'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 12'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 13'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 14'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 15'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 16'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 17'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 18'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 19'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 20'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 21'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 22'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 23'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 24'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 25'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 26'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 27'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 28'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 29'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 30'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 31'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 32'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 33'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 34'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 35'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 36'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 37'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 38'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 39'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 40'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 41'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 42'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 43'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 44'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 45'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 46'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 47'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 48'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 49'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 50'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 51'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 52'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 53'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 54'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 55'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 56'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 57'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 58'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 59'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 60'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 61'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 62'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 63'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 64'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 65'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 66'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 67'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 68'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 69'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 70'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 71'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 72'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 73'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 74'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 75'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 76'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 77'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 78'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 79'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 80'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 81'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 82'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 83'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 84'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 85'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 86'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 87'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 88'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 89'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 90'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 91'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 92'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 93'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 94'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 95'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 96'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 97'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 98'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 99'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 100'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 101'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 102'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 103'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 104'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 105'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 106'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 107'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 108'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 109'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 110'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 111'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 112'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 113'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 114'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 115'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 116'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 117'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 118'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 119'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 120'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 121'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 122'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 123'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 124'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 125'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 126'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 127'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 128'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 129'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 130'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 131'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 132'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 133'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 134'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 135'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 136'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 137'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 138'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 139'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 140'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 141'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 142'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 143'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 144'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 145'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 146'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 147'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 148'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 149'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 150'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 151'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 152'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 153'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 154'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 155'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 156'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 157'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 158'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 159'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 160'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 161'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 162'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 163'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 164'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 165'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 166'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 167'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 168'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 169'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 170'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 171'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 172'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 173'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 174'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 175'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 176'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 177'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 178'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 179'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 180'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 181'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 182'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 183'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 184'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 185'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 186'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 187'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 188'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 189'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 190'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 191'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 192'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 193'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 194'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 195'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 196'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 197'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 198'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 199'),
  // db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 200'),											])

  const ShopAddressBook = await Promise.all([
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 1'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 2'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 3'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 4'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 5'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 6'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-118.400833,34.007778),4326) where id = 7'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 8'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 9'
    ),
    db.query(
      'UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 10'
    )
  ])

  const OfferedDivesAddressBook = await Promise.all([
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 1'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 2'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 3'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 4'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 5'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 6'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 7'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 8'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 9'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 10'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 11'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 12'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 13'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 14'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 15'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 16'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 17'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 18'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 19'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 20'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 21'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 22'
    ),
    db.query(
      'UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 23'
    )
  ])

  console.log(`Location Load Success!`)

  const CertificationsBook = await Promise.all([
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '368SSI',
      date: '2016-08-06',
      diverId: 1,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Rescue Diver',
      certId: '927NAUI',
      date: '2019-01-05',
      diverId: 1,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '752NAUI',
      date: '2018-04-05',
      diverId: 1,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Rescue Diver',
      certId: '903NAUI',
      date: '2018-11-30',
      diverId: 2,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Rescue Diver',
      certId: '900NAUI',
      date: '2018-11-24',
      diverId: 2,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '228PADI',
      date: '2015-12-28',
      diverId: 2,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '084PADI',
      date: '2015-05-14',
      diverId: 3,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '583SSI',
      date: '2017-07-11',
      diverId: 3,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '285PADI',
      date: '2016-03-28',
      diverId: 3,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '369SSI',
      date: '2016-08-07',
      diverId: 4,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '558SSI',
      date: '2017-06-01',
      diverId: 4,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '071PADI',
      date: '2015-04-24',
      diverId: 4,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '845NAUI',
      date: '2018-08-29',
      diverId: 5,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '155PADI',
      date: '2015-09-03',
      diverId: 5,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '423SSI',
      date: '2016-10-31',
      diverId: 5,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '367SSI',
      date: '2016-08-04',
      diverId: 6,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '509SSI',
      date: '2017-03-16',
      diverId: 6,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'Other',
      level: 'Rescue Diver',
      certId: '949Other',
      date: '2019-02-09',
      diverId: 6,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '649NAUI',
      date: '2017-10-23',
      diverId: 7,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '035PADI',
      date: '2015-02-26',
      diverId: 7,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '401SSI',
      date: '2016-09-26',
      diverId: 7,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '286PADI',
      date: '2016-03-28',
      diverId: 8,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '118PADI',
      date: '2015-07-06',
      diverId: 8,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '685NAUI',
      date: '2017-12-20',
      diverId: 8,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '297PADI',
      date: '2016-04-14',
      diverId: 9,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '455SSI',
      date: '2016-12-21',
      diverId: 9,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '458SSI',
      date: '2016-12-26',
      diverId: 9,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '304PADI',
      date: '2016-04-26',
      diverId: 10,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '386SSI',
      date: '2016-09-02',
      diverId: 10,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '448SSI',
      date: '2016-12-10',
      diverId: 10,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '751NAUI',
      date: '2018-04-03',
      diverId: 11,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '222PADI',
      date: '2015-12-18',
      diverId: 11,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'SSI',
      level: 'Open Water',
      certId: '583SSI',
      date: '2017-07-12',
      diverId: 11,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '027PADI',
      date: '2015-02-13',
      diverId: 12,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '843NAUI',
      date: '2018-08-26',
      diverId: 12,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '835NAUI',
      date: '2018-08-13',
      diverId: 12,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '627NAUI',
      date: '2017-09-19',
      diverId: 13,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Advanced Open Water',
      certId: '766NAUI',
      date: '2018-04-27',
      diverId: 13,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '272PADI',
      date: '2016-03-07',
      diverId: 13,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'Other',
      level: 'Deep Diver',
      certId: '974Other',
      date: '2019-03-21',
      diverId: 14,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '275PADI',
      date: '2016-03-11',
      diverId: 14,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '290PADI',
      date: '2016-04-04',
      diverId: 14,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '019PADI',
      date: '2015-02-01',
      diverId: 15,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'NAUI',
      level: 'Rescue Diver',
      certId: '877NAUI',
      date: '2018-10-19',
      diverId: 15,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '261PADI',
      date: '2016-02-18',
      diverId: 15,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 16,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 16,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 16,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 17,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 17,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 17,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '283PADI',
      date: '2016-03-24',
      diverId: 18,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '046PADI',
      date: '2015-03-16',
      diverId: 18,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'Other',
      level: 'Deep Diver',
      certId: '997Other',
      date: '2019-04-26',
      diverId: 18,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 19,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 19,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 19,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 20,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 20,
      instructorId: 'HCOLE1234'
    }),
    Certification.create({
      provider: 'PADI',
      level: 'Open Water',
      certId: '000PADI',
      date: '2015-01-01',
      diverId: 20,
      instructorId: 'HCOLE1234'
    })
  ])

  console.log(`Certification Load Success!`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
