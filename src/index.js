function buildSchema() {
  const schemaBuilder = lf.schema.create("pizzeria_db", 6);

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
    .addColumn("name_of_product", lf.Type.STRING)
    .addColumn("quantity", lf.Type.NUMBER)
    .addColumn("client_name", lf.Type.STRING)
    .addColumn("client_phone", lf.Type.NUMBER)
    .addColumn("address", lf.Type.STRING)
    .addPrimaryKey(["id"]);


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


// Инициализируем и коннектимся к базе данных
const db_builder = buildSchema()
const database = await db_builder.connect()


function createNewProduct(product) {
  const productTable = database.getSchema().table('product');
  const row = productTable.createRow(product);
  return database.insertOrReplace().into(productTable).values([row]).exec();
}
//обновляет название пиццы в продукте с заданным id
function updateNameOfPizza(product_id, new_name) {
  const productTable = database.getSchema().table('product');

  const query = database
    .update(productTable)
    .set(productTable.name_of_pizza, new_name)
    .where(productTable.id.eq(product_id))
    .exec()
}

function deleteProductById(product_id) {
  const productTable = database.getSchema().table('product');

  return database
    .delete()
    .from(productTable)
    .where(productTable.id.eq(product_id))
    .exec();
}

function printAllProducts() {
  const productTable = database.getSchema().table("product");

  return (
    database
      .select()
      .from(productTable)
      // .orderBy(studentTable.educationStartDate, lf.Order.ASC)
      .exec()
      .then(console.table)
  );
}

function createNewOrder(order) {
  const orderTable = database.getSchema().table('order');
  const row = orderTable.createRow(order);
  return database.insertOrReplace().into(orderTable).values([row]).exec();
}

function getProductsWithName() {
  const productTable = database.getSchema().table("product");
  const orderTable = database.getSchema().table("order");

  return database
    .select()
    .from(orderTable)
    .innerJoin(productTable, orderTable.id.eq(productTable.id))
    .exec();
}

const order_list = [
  { id: 1, quantity: 1, created_at: new Date("2020-03-04"),name_of_product:"Margarita", address: "Улица Пушкина, дом колотушкина", client_phone: "8800555", client_name: "Ivan" },
  { id: 2, quantity: 2, created_at: new Date("2020-05-14"),name_of_product:"pepperoni fresh", address: "Osipenko 1", client_phone: "3535", client_name: "Ilya" },
  { id: 3, quantity: 3, created_at: new Date("2020-01-03"),name_of_product:"cheese chicken", address: "Lenina 5", client_phone: "0555", client_name: "Nastya" },
  { id: 4, quantity: 4, created_at: new Date("2021-09-01"),name_of_product:"pepperoni fresh", address: "Revolucii 7", client_phone: "8800", client_name: "Maria" },
]

const product_list = [
  { id: 1, name_of_pizza: "pepperoni fresh", ingredients: "pepperoni", description: "tasty", price: 280, order_id:1},
  { id: 2, name_of_pizza: "cheese chicken", ingredients: "chicken", description: "very tasty", price: 400,order_id:1},
  { id: 3, name_of_pizza: "ranch chicken", ingredients: "chicken", description: "super tasty", price: 430,order_id:2 },
  { id: 4, name_of_pizza: "Margarita", ingredients: "tomatoes", description: "super duper tasty", price: 320,order_id:3 },
]


for (let index = 0; index < order_list.length; index++) {
  const element = order_list[index];
  createNewOrder(element)
}

for (let index = 0; index < product_list.length; index++) {
  const element = product_list[index];
  createNewProduct(element)
}

console.log(printAllProducts(product_list));
console.log(getProductsWithName());