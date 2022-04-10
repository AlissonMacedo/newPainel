import { ReturnPostLoginObj } from '../types/provider';

const loginDataObject: ReturnPostLoginObj = {
  data: {
    data: {
      user: {
        data: {
          email: 'email@teste.com',
          provider: [
            {
              id: 1,
              name: 'teste',
            },
          ],
        },
        cities: [
          {
            name: 'cidade teste',
            stateob: { name: 'mancio lima' },
          },
        ],
      },
      banks: [],
      token: 'token teste',
    },
  },
};

export default loginDataObject;
