import Pet from './models/Pet.js';
import User from './models/User.js';

export default async function saveDataInDb(data) {
  try {
    console.log('savedata');
    const promisesUser = data.users.map ((user) => {
      return (new User(user).save());
    });
    // const user = await Promise.all(promisesUser);
    // console.log(user);
   //
  //   const promises = data.pets.map ((pet) => {
  //     //  console.log(pet.userId);
  //     //  let user = users.find({id: pet.userId});
  //     //  user.then((doc) => {
  //     //    console.log(doc);
  //     //    const petData = Object.assign({}, pet, {
  //     //    user: doc._id,
  //     //  });
  //     //  })
  //    return (new Pet(pet)).save();
  //  });
    const promises = data.pets.map ((pet) => {
          return (new Pet(pet)).save();
    });
    console.log('success');
    return {
      users: await Promise.all(promisesUser),
      pets: await Promise.all(promises),
    };
  } catch (err) {
    console.log('error', err);
    throw err;
  }
}
