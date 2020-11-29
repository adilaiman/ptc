import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../templates/map.js';

FlowRouter.route('/', {
    name: 'map',
    action() {
      BlazeLayout.render('MainLayout', { main: 'map' });
    }
});