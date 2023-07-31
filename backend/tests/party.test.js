const jest = require('jest');
const assert = require('supertest');
const partyController = require('../src/controllers/partyController');
const Party = require('../src/models/Party');

jest.mock('../src/models/Party');

const request = {
  body: {
    title: 'Teste 1',
    author: 'McLovin',
    description: 'Testing party',
    budget: 20000,
    image: 'teste',
    services: [
      {
        name: 'Algum serviço',
        description: 'Alguma descrição',
        price: 2000,
        image: 'teste',
      },
    ],
  },
};

const response = {
  status: jest.fn((x) => ({ ...response, statusCode: x })),
  json: jest.fn(),
};

describe('Test to see if all parties routes work properly', () => {
  it('Should send a status code 406 when budget is too low', async () => {
    Party.create.mockRejectedValueOnce(request);

    await partyController.create(request, response);
    expect(response.status).toHaveBeenCalledWith(406);
  });

  it('Should send a status code 201 when a party is created', async () => {
    Party.create.mockResolvedValueOnce(request);

    await partyController.create(request, response);
    expect(response.status).toHaveBeenCalledWith(201);
  });
});
