/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n7ibukl9deo3mk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ldlybckz",
    "name": "booked",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n7ibukl9deo3mk")

  // remove
  collection.schema.removeField("ldlybckz")

  return dao.saveCollection(collection)
})
