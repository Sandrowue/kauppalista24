/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o0se0j7u8kmyb5a")

  collection.name = "kauppalistan_tuoteet"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o0se0j7u8kmyb5a")

  collection.name = "kauppalistan_tueteet"

  return dao.saveCollection(collection)
})
