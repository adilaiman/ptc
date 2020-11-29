import { Meteor } from 'meteor/meteor';
import Doctors from '../imports/api/doctors.js';

// init collections
import '../imports/api/doctors.js';
import '../imports/api/appointments.js';

// init services
import '../imports/api/doctors-service.js';
import '../imports/api/appointments-service.js';


Meteor.startup(() => {
    //clear collection on startup
    //caching doctors
    Doctors.remove({});
});
