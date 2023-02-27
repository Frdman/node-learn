const database = await buildSchema();
function buildSchema () {

  const schemaBuilder = lf.schema.create("pizzeria_db", 1);
        schemaBuilder
        .createTable('restaurant')
        .addColumn('restaurant_id', lf.Type.INTEGER)
        .addColumn('email', lf.Type.STRING)
        .addColumn('address', lf.Type.STRING)
        .addColumn('phone', lf.Type.NUMBER)
        .addPrimaryKey(['restaurant_id'])
        .addNullable(["phone"]);

        schemaBuilder
        .createTable('product')
        .addColumn('product_id', lf.Type.INTEGER)
        .addColumn('name_of_pizza', lf.Type.STRING)
        .addColumn('Ingredients', lf.Type.STRING)
        .addColumn('description', lf.Type.STRING)
        .addColumn('price', lf.Type.NUMBER)
        .addPrimaryKey(['product_id']);

        schemaBuilder
        .createTable('order')
        .addColumn('order_id', lf.Type.INTEGER)
        .addColumn('created_at', lf.Type.DATA_TIME)
        .addColumn('quantity', lf.Type.NUMBER)
        .addColumn('client_name', lf.Type.STRING)
        .addColumn('client_phone', lf.Type.NUMBER)
        .addColumn('addresss', lf.Type.STRING)
        .addPrimaryKey(["order_id"])
        .addUnique("uq_name", ["client_name"])
        .addNullable(["client_phone"]);


        schemaBuilder
        .createTable('restaurant_product')
        .addColumn('restaurant_id', lf.Type.INTEGER)
        .addColumn('product_id', lf.Type.INTEGER)
        .addColumn('res', lf.Type.INTEGER)
        .addColumn('prod', lf.Type.INTEGER)
        .addForeignKey("fk_res", {
          local: "res",
        ref: "restaurant_id",
        })
        .addForeignKey("fk_prod", {
          local: "prod",
        ref: "Product_id",
        });

        schemaBuilder
        .createTable('product_order')
        .addColumn('order_id', lf.Type.INTEGER)
        .addColumn('product_id', lf.Type.INTEGER)
        .addColumn('or', lf.Type.INTEGER)
        .addColumn('or', lf.Type.INTEGER)
        .addColumn('prod1', lf.Type.INTEGER)
        .addForeignKey("fk_or", {
          local: "or",
        ref: "Order_id",
        })
       .addForeignKey("fk_prod1", {
          local: "prod1",
        ref: "Product_id",
        });

        schemaBuilder
        .createTable('restaurant_order')
        .addColumn('order_id', lf.Type.INTEGER)
        .addColumn('restaurant_id', lf.Type.INTEGER)
        .addColumn('res1', lf.Type.INTEGER)
        .addColumn('or1', lf.Type.INTEGER)
        .addForeignKey("fk_res1", {
          local: "res1",
        ref: "Restaurant_id",
        })
        .addForeignKey("fk_or1", {
          local: "or1",
        ref: "Order_id",
        });
      }

function saveOrder (order) {
   const orderTable = database.getSchema().table("order");
   const row = orderTable.createRow();

   return database.insertOrReplace().into(orderTable).values([row]).exec();
}

