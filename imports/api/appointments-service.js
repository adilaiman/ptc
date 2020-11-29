import Appointments from './appointments.js';
import SimplSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

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
        return Appointments.insert({ placesId, date, full_name, email, doctor_name });
    }
});

export const getAllAppointments = new ValidatedMethod({
    name: 'appointments.getAllAppointments',
    validate: null,
    run() {
        return Appointments.find({}, { sort: { date: 1 } }).fetch();
    }
});

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

export const removeAppointment = new ValidatedMethod({
    name: 'appointments.remove',
    validate: new SimplSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Appointments.remove({ _id });
    }
});