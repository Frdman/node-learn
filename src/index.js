function buildSchema() {
  const schemaBuilder = lf.schema.create("pizzeria_db",6);

  schemaBuilder
  .createTable("restaurant")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("email", lf.Type.STRING)
  .addColumn("address", lf.Type.STRING)
  .addColumn("phone", lf.Type.NUMBER)
  .addPrimaryKey(["id"])
  .addNullable(["phone"]);

  schemaBuilder
  .createTable("product")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("name_of_pizza", lf.Type.STRING)
  .addColumn("ingredients", lf.Type.STRING)
  .addColumn("description", lf.Type.STRING)
  .addColumn("price", lf.Type.NUMBER)
  .addPrimaryKey(["id"]);

  schemaBuilder
  .createTable("order")
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("created_at", lf.Type.DATA_TIME)
  .addColumn("quantity", lf.Type.NUMBER)
  .addColumn("client_name", lf.Type.STRING)
  .addColumn("client_phone", lf.Type.NUMBER)
  .addColumn("address", lf.Type.STRING)
  .addPrimaryKey(["id"])
  // .addUnique("uq_id", ["id"])
  .addNullable(["client_phone"]);


  schemaBuilder
  .createTable("restaurant_product")
  .addColumn("restaurant_id", lf.Type.INTEGER)
  .addColumn("product_id", lf.Type.INTEGER)
  .addColumn("res", lf.Type.INTEGER)
  .addColumn("prod", lf.Type.INTEGER)
  .addForeignKey("fk_res", {
    local: "restaurant_id",
    ref: "restaurant.id",
  })
  .addForeignKey("fk_prod", {
    local: "product_id",
    ref: "product.id",
  });

  schemaBuilder
  .createTable("product_order")
  .addColumn("order_id", lf.Type.INTEGER)
  .addColumn("product_id", lf.Type.INTEGER)
  .addColumn("or", lf.Type.INTEGER)
  .addColumn("prod1", lf.Type.INTEGER)
  .addForeignKey("fk_or", {
    local: "order_id",
    ref: "order.id",
  })
  .addForeignKey("fk_prod1", {
    local: "product_id",
    ref: "product.id",
  });

  schemaBuilder
  .createTable("restaurant_order")
  .addColumn("order_id", lf.Type.INTEGER)
  .addColumn("restaurant_id", lf.Type.INTEGER)
  .addColumn("res1", lf.Type.INTEGER)
  .addColumn("or1", lf.Type.INTEGER)
  .addForeignKey("fk_res1", {
    local: "restaurant_id",
    ref: "restaurant.id",
  })
  .addForeignKey("fk_or1", {
    local: "order_id",
    ref: "order.id",
  });
  return schemaBuilder
}

let order = {
  id: 1,
  quantity: 2,
  address: "Улица Пушкина, дом колотушкина", 
  created_at: new Date("2020-09-01"),
  client_name: "Grigory Petrov",
  client_phone: "88005553535",
};

let order1 = {
  id: 2,
  quantity: 4,
  address: "samara", 
  created_at: new Date("2020-04-07"),
  client_name: "Petr Grigorenko",
  client_phone: "888888",
};

// Инициализируем и коннектимся к базе данных
const db_builder = buildSchema()
const database = await db_builder.connect()

function createNewOrder(order){
  const orderTable = database.getSchema().table('order');
  const row = orderTable.createRow(order);
  return database.insertOrReplace().into(orderTable).values([row]).exec();
}
//обновляет номер телефона заказчика с заданным id
function updatePhoneByOrderId(order_id, new_phone){
  const orderTable = database.getSchema().table('order');

  return database.update(orderTable)
    .set(orderTable.client_phone, new_phone)
    .where(orderTable.id.eq(order_id))
    .exec()
}

function getOrderById(order_id){
  const orderTable = database.getSchema().table('order');
  return database.select(orderTable.client_phone)
    .from(orderTable)
    .where(orderTable.id.eq(orderTable)).exec();
}

function deleteOrderById(order_id){
  const orderTable = database.getSchema().table('order');
  return database.delete()
    .from(orderTable)
    .where(orderTable.id.eq(order_id)).exec();
}

console.log(createNewOrder(order))
// console.log(updatePhoneByOrderId(1, '88005553535'))
//console.log(getOrderById(1))
console.log(updatePhoneByOrderId(1, "77777777777"))
//console.log(getOrderById(1))
console.log(deleteOrderById(10))