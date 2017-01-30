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
  }
}, {
    collection: 'user',
    timestamps: true,
  });

UserSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'username', 'fullname', 'password', 'values']);
};

export default mongoose.model('User', UserSchema);
