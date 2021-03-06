import mongoose from 'mongoose';
import _ from 'lodash';
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  id: Number,
  userId: Number,
  type: String,
  name: String,
  color: String,
  age: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
},
}, {
    collection: 'pets',
    timestamps: true,
  });

PetSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'userId', 'type', 'color', 'age', 'user']);
};

export default mongoose.model('Pet', PetSchema)
