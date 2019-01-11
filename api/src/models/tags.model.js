// tags-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tags = new Schema({
    id: { type: String, required: true },
    label: { type: String },
    creator: { type: String },
    handle: { type: String },
    date: { type: String },
    type: { type: String },
    img: { type: String },
    imgsm: { type: String },
    nodes: { type: Array }
  }, 
  {
    timestamps: true
  });

  return mongooseClient.model('tags', tags);
};
