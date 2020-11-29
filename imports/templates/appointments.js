import { getAllAppointments, removeAppointment } from '../api/appointments-service.js';

import './appointments.html';
import './footer.js';

let sub;
Template.appointments.onCreated(function() {
    sub = Meteor.subscribe('appointments');
});

Template.appointments.helpers({
    appointments() {
        if (sub.ready()) {
            return getAllAppointments.call();
        }
    },
    hasAppointments() {
        if (sub.ready()) {
            return getAllAppointments.call().length > 0;
        }
    },
    formatDate(date) {
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
    count() {
        return getAllAppointments.call().length;
    },
});

Template.appointments.events({
    'click .delete-appointment'(event) {
        const _id = event.target.id;
        removeAppointment.call({ _id });
    }
});