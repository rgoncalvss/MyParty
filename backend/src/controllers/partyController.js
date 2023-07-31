const { Types } = require('mongoose');
const PartyModel = require('../models/Party');

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }

  return true;
};
const partyController = {

  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        return res.status(406).json({ msg: 'Your budget is too low' });
      }

      const response = await PartyModel.create(party);
      res.status(201).json({ response, msg: 'Party created successfully' });
    } catch (e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();

      if (!parties) {
        return res.status(404).json({ error: 'No parties found' });
      }

      res.json(parties);
    } catch (e) {
      console.log(e);
    }
  },

  getById: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const party = await PartyModel.findById(id);

      if (!party) {
        return res.status(404).json({ error: 'Party not found' });
      }

      res.json(party);
    } catch (e) {
      console.log(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const party = await PartyModel.findByIdAndDelete(id);

      if (!party) {
        return res.status(404).json({ error: 'Party not found' });
      }

      res.status(200).json({ msg: 'Party deleted successefully' });
    } catch (e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const party = await PartyModel.findById(id);

      if (!party) {
        return res.status(404).json({ error: 'Party not found' });
      }

      const newParty = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (newParty.services && !checkPartyBudget(newParty.budget, newParty.services)) {
        return res.status(406).json({ msg: 'Your budget is too low' });
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, newParty);

      res.json({ updatedParty, msg: 'Party updated successefully' });
    } catch (e) {
      console.log(e);
    }
  },

};

module.exports = partyController;
