import { Mongo } from 'meteor/mongo';

export default Appointments = new Mongo.Collection('appointments');

if (Meteor.isServer) {
    Meteor.publish('appointments', function() { return Appointments.find({}) });
}