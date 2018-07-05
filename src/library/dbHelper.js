export default {
  findOne: (model, query) => {
    return new Promise(resolve => {
      model.findOne(query).then(response => {
        if (response) {
          resolve({ message: 'Found', found: true, user: response });
        }
        resolve({ message: 'Not Found', found: false });
      });
    });
  }
};
