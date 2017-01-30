export default function (pcUrl) {
  return new Promise ((resolve, reject) => {
    let pc = {};
    fetch(pcUrl)
      .then(async (res) => {
        pc = await res.json();
        resolve(pc);
      })
      .catch(err => {
        reject(err);
        console.log('Чтото пошло не так:', err);
      });

  });
}
