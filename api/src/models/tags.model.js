// tags-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const tags = new Schema(
    {
      nodeId: { type: String, required: true },
      label: { type: String },
      details: { type: String },
      creator: { type: String },
      handle: { type: String },
      date: { type: String },
      type: { type: String },
      img: { type: String },
      imgsm: { type: String },
      nodes: { type: Array }, // Array of nodeIds for nodes with this tag
      users: { type: Array }  // Array of {cretor,handle} structs
    },
    {
      timestamps: true
    }
  );

  tags.index({ label: "text", details: "text" });

  return mongooseClient.model("tags", tags);
};
