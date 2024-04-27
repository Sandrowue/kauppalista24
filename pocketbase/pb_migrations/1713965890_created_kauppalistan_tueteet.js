/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "o0se0j7u8kmyb5a",
    "created": "2024-04-24 13:38:10.795Z",
    "updated": "2024-04-24 13:38:10.795Z",
    "name": "kauppalistan_tueteet",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pklax9dc",
        "name": "lista",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "sf3pprfguxrl9ph",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "kqm0szpo",
        "name": "nro",
        "type": "number",
        "required": false,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "3wgco8ph",
        "name": "tuote",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 200,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qqlzfemc",
        "name": "ostettu",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o0se0j7u8kmyb5a");

  return dao.deleteCollection(collection);
})
