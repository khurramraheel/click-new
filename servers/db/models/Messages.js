const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const messagesSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    data: {
      type: dataSchema,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const chatBoxSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  messages: {
    type: [messagesSchema]
  }
});

module.exports = mongoose.model("Message", chatBoxSchema);
