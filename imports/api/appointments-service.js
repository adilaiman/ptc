import Appointments from './appointments.js';
import SimplSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary inserts an appointment
 * @function insertAppointment
 * @param {String} placesId - id of doctor location
 * @param {Date} date - date of appointment
 * @param {String} full_name - full name of person booking
 * @param {String} email - email of person booking
 * @param {String} doctor - name of doctor
 */
export const insertAppointment = new ValidatedMethod({
    name: 'appointments.insert',
    validate: new SimplSchema({
        placesId: { type: String },
        date: { type: Date },
        full_name: { type: String },
        email: { type: String },
        doctor_name: { type: String },
    }).validator(),
    run({ placesId, date, full_name, email, doctor_name }) {
        Appointments.insert({ placesId, date, full_name, email, doctor_name });
    }
});

/**
 * @summary returns all appointments
 * @function getAllAppointments
 * @return {Array} appointmentArray - an array of appointment objects
 */
export const getAllAppointments = new ValidatedMethod({
    name: 'appointments.getAllAppointments',
    validate: null,
    run() {
        return Appointments.find({}, { sort: { date: 1 } }).fetch();
    }
});

/**
 * @summary checks if appointment exists
 * @function appointmentExists
 * @param {String} placesId - id of doctor location
 * @param {Date} date - date of appointment
 * @param {String} full_name - full name of person booking
 * @param {String} email - email of person booking
 * @param {String} doctor - name of doctor
 * @return {Boolean} appointmentExists - true if exists
 */
export const appointmentExists = new ValidatedMethod({
    name: 'appointment.Exists',
    validate: new SimplSchema({
        placesId: { type: String },
        date: { type: Date },
        full_name: { type: String },
        email: { type: String },
        doctor_name: { type: String },
    }).validator(),
    run({ placesId, date, full_name, email, doctor_name }) {
        return Appointments.find({ placesId, date, full_name, email, doctor_name }).fetch().length > 0;
    }
});

/**
 * @summary removes an appointment
 * @function removeAppointment
 * @param {String} _id - appointment id
 */
export const removeAppointment = new ValidatedMethod({
    name: 'appointments.remove',
    validate: new SimplSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Appointments.remove({ _id });
    }
});