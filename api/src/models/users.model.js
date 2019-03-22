// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const users = new Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      fullname: { type: String },
      avatar: { type: String },
      handle: { type: String },
      isVerified: { type: Boolean },
      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: { type: Object },
      resetToken: { type: String },
      resetExpires: { type: Date }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('users', users);
};
