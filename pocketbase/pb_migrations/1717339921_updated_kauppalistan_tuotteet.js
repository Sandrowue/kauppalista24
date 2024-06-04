/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o0se0j7u8kmyb5a")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqlzfemc",
    "name": "valmis",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o0se0j7u8kmyb5a")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqlzfemc",
    "name": "ostettu",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
