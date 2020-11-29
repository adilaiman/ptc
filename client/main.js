import { Template } from 'meteor/templating';
import { getAllDoctors } from '../imports/api/doctors-service.js';

import './main.html';

//import templates
import '../imports/layouts/mainlayout.js';
import '../imports/templates/modal.js';

//import routes
import '../imports/lib/routes.js';

//import materializecss
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.css'

let sub;

Template.body.onCreated(function() {
    sub = Meteor.subscribe('doctors');
});

Template.body.onRendered(function() {
    $('.sidenav').sidenav();
});

Template.body.helpers({
    isReady() {
        return sub.ready();
    },
    gpList() {
        return getAllDoctors.call();
    },
});