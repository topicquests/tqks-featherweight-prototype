/**
 * A Conversation is a Tree, typically rooted in a Quest
 * A Conversation tree node is of these types
 *   Question -- aka Issue
 *   Answer -- aka Position
 *   Pro Argument
 *   Con Argument
 * A conversation node is an object with these fields
 *  id -- UUID
 *  creatorId -- String
 *  createdDaate -- Date
 *  label -- String
 *  details -- String -- rich text
 *  parentId -- String
 *  url -- String -- a URL string
 *  questionList -- Array of String
 *  answerList -- Array of String
 *  proList -- Array of String
 *  conList -- Array of String
 *  tagList -- Array of String  (later)
 *  connectionList -- Array of String  (later)
 * 
 * We are indexing by
 *  id
 *  label
 */

const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'conversation.db'),
    autoload: true
  });
  
  Model.ensureIndex({ fieldName: 'id', unique: true })
  Model.ensureIndex({ fieldName: 'label'})

  return Model;
};
