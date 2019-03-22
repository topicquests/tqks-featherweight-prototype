// conversation-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// See https://mongoosejs.com/docs/schematypes.html#maps
// for using maps for label and details where we would use
// language codes, e.g. "en": "some string"
// label: { type: Map, of: String, required: true }
// details: { type: Map, of: String }
// use:
//    label: { en: 'Dog',
//             fr: 'Chien' }
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const conversation = new Schema(
    {
      label: { type: String, required: true },
      nodeId: { type: String, required: true },
      details: { type: String },
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
      tags: { type: Array },
      skippop: { type: Boolean }
    },
    {
      timestamps: true
    }
  );

  conversation.index({ label: "text", details: "text" });

  return mongooseClient.model("conversation", conversation);
};
