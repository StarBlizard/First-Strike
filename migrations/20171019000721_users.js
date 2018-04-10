exports.up = function(knex, Promise) {  
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments();
    table.text("username");
    table.text("displayName");
    table.text("twitter_id");
    table.text("photo");
    table.text("headColor");
    table.text("headImage");
    table.text("sideColor");
    table.text("textColor");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
