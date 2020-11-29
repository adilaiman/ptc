import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import faker from 'faker';

export default Doctors = new Mongo.Collection('doctors');

if (Meteor.isServer) {
    Meteor.publish('doctors', function() { return Doctors.find({}) });
}

faker.locale="en_GB";
Factory.define('Doctor', Doctors, {
    placesId() {
        return Random.id();
    },
    name() {
        return `${faker.name.firstName()} ${faker.name.lastName()}`;
    },
    address() {
        return faker.address.streetAddress();
    },
    phone() {
        return faker.phone.phoneNumber();
    },
});