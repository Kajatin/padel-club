/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "j6727g3lafcd98a",
    "created": "2023-08-26 11:49:19.258Z",
    "updated": "2023-08-26 11:49:19.258Z",
    "name": "faq",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4xnlgz0n",
        "name": "question",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "f4gdokng",
        "name": "answer",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("j6727g3lafcd98a");

  return dao.deleteCollection(collection);
})
