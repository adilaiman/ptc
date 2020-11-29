import { Mongo } from 'meteor/mongo';

export default Doctors = new Mongo.Collection('doctors');

if (Meteor.isServer) {
    Meteor.publish('doctors', function() { return Doctors.find({}) });
}