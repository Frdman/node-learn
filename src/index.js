const database = await buildSchema();
const order = {
  id: 1,
  created_at: new Date("2020-09-01"),
  client_name: "Grigory Petrov"
};
await saveOrder(order;)

function buildSchema () {

  const schemaBuilder = lf.schema.create("pizzeria_db", 1);

  schemaBuilder
  .createTable('restaurant')
  .addColumn('id', lf.Type.INTEGER)
  .addColumn('email', lf.Type.STRING)
  .addColumn('address', lf.Type.STRING)
  .addColumn('phone', lf.Type.NUMBER)
  .addPrimaryKey(['id'])
  .addNullable(["phone"]);

  schemaBuilder
  .createTable('product')
  .addColumn('id', lf.Type.INTEGER)
  .addColumn('name_of_pizza', lf.Type.STRING)
  .addColumn('ingredients', lf.Type.STRING)
  .addColumn('description', lf.Type.STRING)
  .addColumn('price', lf.Type.NUMBER)
  .addPrimaryKey(['id']);

  schemaBuilder
  .createTable('order')
  .addColumn('id', lf.Type.INTEGER)
  .addColumn('created_at', lf.Type.DATA_TIME)
  .addColumn('quantity', lf.Type.NUMBER)
  .addColumn('client_name', lf.Type.STRING)
  .addColumn('client_phone', lf.Type.NUMBER)
  .addColumn('addresss', lf.Type.STRING)
  .addPrimaryKey(["id"])
  .addUnique("uq_name", ["client_name"])
  .addNullable(["client_phone"]);


  schemaBuilder
  .createTable('restaurant_product')
  .addColumn('restaurant_id', lf.Type.INTEGER)
  .addColumn('product_id', lf.Type.INTEGER)
  .addColumn('res', lf.Type.INTEGER)
  .addColumn('prod', lf.Type.INTEGER)
  .addForeignKey("fk_res", {
    local: "restaurant_id",
    ref: "restaurant.id",
  })
  .addForeignKey("fk_prod", {
    local: "product_id",
    ref: "product.id",
  });

  schemaBuilder
  .createTable('product_order')
  .addColumn('order_id', lf.Type.INTEGER)
  .addColumn('product_id', lf.Type.INTEGER)
  .addColumn('or', lf.Type.INTEGER)
  .addColumn('prod1', lf.Type.INTEGER)
  .addForeignKey("fk_or", {
    local: "order_id",
    ref: "order.id",
  })
  .addForeignKey("fk_prod1", {
    local: "product_id",
    ref: "product.id",
  });

  schemaBuilder
  .createTable('restaurant_order')
  .addColumn('order_id', lf.Type.INTEGER)
  .addColumn('restaurant_id', lf.Type.INTEGER)
  .addColumn('res1', lf.Type.INTEGER)
  .addColumn('or1', lf.Type.INTEGER)
  .addForeignKey("fk_res1", {
    local: "restaurant_id",
    ref: "restaurant.id",
  })
  .addForeignKey("fk_or1", {
    local: "order_id",
    ref: "order.id",
  });

  schemaBuilder.connect().then((db) => {
    console.log(db.getSchema());
  });
}

function saveOrder (order) {
   const orderTable = database.getSchema().table("order");
   const row = orderTable.createRow();
   return database.insertOrReplace().into(orderTable).values([row]).exec();
}

buildSchema()