import Doctors from './doctors.js';
import SimplSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertDoctor = new ValidatedMethod({
    name: 'doctors.insert',
    validate: new SimplSchema({
        placesId: { type: String },
        name: { type: String },
        address: { type: String },
        phone: { type: String },
    }).validator(),
    run({ placesId, name, address, phone }) {
        return Doctors.insert({ placesId, name, address, phone});
    }
});

export const getDoctor = new ValidatedMethod({
    name: 'doctors.getDoctor',
    validate: new SimplSchema({
        placesId: { type: String },
    }).validator(),
    run({ placesId }) {
        return Doctors.findOne({ placesId });
    }
});

export const getAllDoctors = new ValidatedMethod({
    name: 'doctors.getAllDoctors',
    validate: null,
    run() {
        return Doctors.find({}).fetch();
    }
});

export const doctorExists = new ValidatedMethod({
    name: 'doctors.Exists',
    validate: new SimplSchema({
        placesId: { type: String },
    }).validator(),
    run({ placesId }) {
        return Doctors.find({ placesId }).fetch().length > 0;
    }
});