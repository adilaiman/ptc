import Doctors from './doctors.js';
import SimplSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary inserts a doctor
 * @function insertDoctor
 * @param {String} placesId - id of doctor location
 * @param {String} name - name of doctor
 * @param {String} address - address of doctor
 * @param {String} phone - phone number of doctor
 */
export const insertDoctor = new ValidatedMethod({
    name: 'doctors.insert',
    validate: new SimplSchema({
        placesId: { type: String },
        name: { type: String },
        address: { type: String },
        phone: { type: String },
    }).validator(),
    run({ placesId, name, address, phone }) {
        Doctors.insert({ placesId, name, address, phone});
    }
});

/**
 * @summary gets a specific doctor
 * @function getDoctor
 * @param {String} placesId - id of doctor location
 * @return {Object} doctor - a doctor object
 */
export const getDoctor = new ValidatedMethod({
    name: 'doctors.getDoctor',
    validate: new SimplSchema({
        placesId: { type: String },
    }).validator(),
    run({ placesId }) {
        return Doctors.findOne({ placesId });
    }
});

/**
 * @summary returns all doctors
 * @function getAllDoctors
 * @return {Array} doctorsArray - an array of doctor objects
 */
export const getAllDoctors = new ValidatedMethod({
    name: 'doctors.getAllDoctors',
    validate: null,
    run() {
        return Doctors.find({}).fetch();
    }
});

/**
 * @summary checks if doctor exists
 * @function doctorExists
 * @param {String} placesId - id of doctor location
 * @return {Boolean} doctorExists - true if exists
 */
export const doctorExists = new ValidatedMethod({
    name: 'doctors.Exists',
    validate: new SimplSchema({
        placesId: { type: String },
    }).validator(),
    run({ placesId }) {
        return Doctors.find({ placesId }).fetch().length > 0;
    }
});