/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n7ibukl9deo3mk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l0nvd7nj",
    "name": "participants",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 4,
      "displayFields": [
        "name",
        "avatar"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n7ibukl9deo3mk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l0nvd7nj",
    "name": "participants",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 4,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
