// conversation-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const conversation = new Schema(
    {
      label: { type: String, required: true },
      id: { type: String, required: true },
      label: { type: String },
      url: { type: String },
      creator: { type: String },
      handle: { type: String },
      date: { type: String },
      type: { type: String },
      img: { type: String },
      imgsm: { type: String },
      parentLabel: { type: String },
      parentId: { type: String },
      questions: { type: Array },
      answers: { type: Array },
      pros: { type: Array },
      cons: { type: Array },
      tags: { type: Array }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model("conversation", conversation);
};
