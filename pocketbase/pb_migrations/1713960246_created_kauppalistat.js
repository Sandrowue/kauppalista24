/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sf3pprfguxrl9ph",
    "created": "2024-04-24 12:04:06.466Z",
    "updated": "2024-04-24 12:04:06.466Z",
    "name": "kauppalistat",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qdnpr2mk",
        "name": "nimi",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 100,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sf3pprfguxrl9ph");

  return dao.deleteCollection(collection);
})
