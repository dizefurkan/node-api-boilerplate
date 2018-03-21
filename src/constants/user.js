import { models } from '../models';

export default {
    findOne: (table, column, value) => {
        return new Promise((resolve, reject) => {
            models[table].findOne( { where: { [column]: value }}).then(response => {
                if (response) {
                    resolve({ message: 'Found', found: true, password: response.password });
                } else {
                    resolve({ message: 'Not Found', found: false });
                }
            })
        })
    }
}