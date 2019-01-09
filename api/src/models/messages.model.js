// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const messages = new Schema(
    {
      text: { type: String, required: true },
      userId: { type: String }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("messages", messages);
};
