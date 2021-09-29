const mongoose = require("mongoose");

/**
 * Mongoose Model for our MongoDB Collection
 * See:
 *  https://mongoosejs.com/docs/models.html
 *  https://docs.mongodb.com/manual/core/databases-and-collections/#collections
 */

const userGroupSchema = new mongoose.Schema({
  username: {
    type: String,
    // This prevents duplicate documents w/the exact same info from being created for this model.
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // This prevents duplicate documents w/the exact same info from being created for this model.
    required: true,
  },
  email: {
    type: String,
    //unique: true,
  },
  orderNum: {
    type: Number,
  },
});

const UserGroup_Item = mongoose.model("UserGroupSchema", userGroupSchema);

module.exports = UserGroup_Item;
