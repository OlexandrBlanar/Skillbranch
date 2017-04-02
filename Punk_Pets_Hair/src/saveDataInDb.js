import Pet from './models/Pet.js';
import User from './models/User.js';
import Promise from 'bluebird';

export default async function saveDataInDb(data) {
  try {
    let promisesUsers = data.users.map ((user) => {
          return (new User(user)).save();
    });

    const users = await Promise.all(promisesUsers);
    const promises = data.pets.map (async (pet) => {
       let user =  await User.findOne({id: pet.userId});
       const petData = Object.assign({}, pet, {
         user: user._id,
       });
       const pets = await (new Pet(petData)).save()
       return pets;
   });

   const pets = await Promise.all(promises);
   users.forEach(async (user) => {
      let pets =  await Pet.find({userId: user.id});

      await Promise.all(pets.map((pet) => {
        return User.update({id: pet.userId}, { $push: { pets: pet._id }});
      }));
  });

    return {
      users,
      pets,
    };
  } catch (err) {
    console.log('error', err);
    throw err;
  }
}
