import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker, { date } from 'faker';

export default Appointments = new Mongo.Collection('appointments');

if (Meteor.isServer) {
    Meteor.publish('appointments', function() { return Appointments.find({}) });
}

faker.locale="en_GB";
Factory.define('Appointment', Appointments, {
    placesId() {
        return Random.id();
    },
    date() {
        return faker.date.future();
    },
    full_name() {
        return `${faker.name.firstName()} ${faker.name.lastName()}`;
    },
    email() {
        return faker.internet.email();
    },
    doctor_name() {
        return `${faker.name.firstName()} ${faker.name.lastName()}`;
    },
});