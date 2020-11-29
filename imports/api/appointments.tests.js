import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Appointments from './appointments.js';
import { insertAppointment, getAllAppointments, appointmentExists, removeAppointment } from './appointments-service.js';

if (Meteor.isServer) {
    describe('Appointments', function() {
        describe('publications', function() {
            before(() => {
                Appointments.remove({});
                const app1 = Factory.create('Appointment');
                const app2 = Factory.create('Appointment');
            });

            describe('appointments', function() {
                it('sends all appointments', function(done) {
                    const collector = new PublicationCollector();
                    collector.collect('appointments', function(collections) {
                        assert.equal(collections.appointments.length, 2);
                        done();
                    });
                });
            });
        });

        describe('methods', function() {
            let app1;
            let app2;
            beforeEach(() => {
                Appointments.remove({});
                app1 = Factory.create('Appointment');
                app2 = Factory.create('Appointment');
            });

            describe('appointments.insert', function() {
                it('inserts a appointment', function(done) {
                    const testData = {
                        placesId: Random.id(),
                        date: new Date(),
                        full_name: 'test',
                        email: 'test@test.com',
                        doctor_name: 'test'
                    };
                    insertAppointment.call(testData);
                    const dataFromCollection = Appointments.findOne(testData);
                    delete dataFromCollection._id;
                    assert.deepEqual(dataFromCollection, testData);
                    done();
                });
            });

            describe('appointments.getAllAppointments', function() {
                it('returns all appointments', function(done) {
                    assert.equal(getAllAppointments.call().length, Appointments.find({}).count());
                    done();
                });
            });
    
            describe('appointments.appointmentExists', function() {
                it('returns true if appointment already exists', function(done) {
                    const { placesId, date, full_name, email, doctor_name } = app1;
                    assert.isTrue(appointmentExists.call({
                        placesId,
                        date,
                        full_name,
                        email,
                        doctor_name
                    }));
                    done();
                });
                it('returns false if appointment does not exists', function(done) {
                    assert.isFalse(appointmentExists.call({
                        placesId: '',
                        date: new Date(),
                        full_name: '',
                        email: '',
                        doctor_name: ''
                    }));
                    done();
                });
            });

            describe('appointments.removeAppointment', function() {
                it('removes an appointment', function(done) {
                    const { _id } = app1;
                    removeAppointment.call({ _id });
                    assert.equal(Appointments.find({}).count(), 1);
                    done();
                });
            });
        });
    });
}