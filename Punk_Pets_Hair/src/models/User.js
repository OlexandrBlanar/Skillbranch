import mongoose from 'mongoose';
import _ from 'lodash';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  username: String,
  fullname: String,
  password: String,
  values: {
    money: String,
    origin: String,
  },
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet',
  }],
}, {
    collection: 'users',
    timestamps: true,
  });

UserSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'username', 'fullname', 'password', 'values', 'pets']);
};

export default mongoose.model('User', UserSchema);
