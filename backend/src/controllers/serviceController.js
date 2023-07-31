const { Types } = require('mongoose');

const { Service: ServiceModel } = require('../models/Service');

const serviceController = {

  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: 'Service successfully created' });
    } catch (e) {
      console.log(e);
    }
  },

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      if (!services) {
        return res.status(404).json({ error: 'List of services not found' });
      }

      res.status(200).json(services);
    } catch (e) {
      console.log(e);
    }
  },

  getById: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json(service);
    } catch (e) {
      console.log(e);
    }
  },

  delete: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const deletedservice = await ServiceModel.findByIdAndDelete(id);

      res.status(200).json({ deletedservice, msg: 'Service deleted' });
    } catch (e) {
      console.log(e);
    }
  },

  update: async (req, res) => {
    try {
      const id = new Types.ObjectId(req.params.id);
      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const newService = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updateService = await ServiceModel.findByIdAndUpdate(id, newService);

      res.status(200).json({ service, msg: 'Service updated' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'An error occurred while updating the service' });
    }
  },
};

module.exports = serviceController;
