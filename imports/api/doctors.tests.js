import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Doctors from './doctors.js';
import { insertDoctor, getDoctor, getAllDoctors, doctorExists } from './doctors-service.js';

if (Meteor.isServer) {
    describe('Doctors', function() {
        describe('publications', function() {
            before(() => {
                Doctors.remove({});
                const doc1 = Factory.create('Doctor');
                const doc2 = Factory.create('Doctor');
            });

            describe('doctors', function() {
                it('sends all doctors', function(done) {
                    const collector = new PublicationCollector();
                    collector.collect('doctors', function(collections) {
                        assert.equal(collections.doctors.length, 2);
                        done();
                    });
                });
            });
        });

        describe('methods', function() {
            let doc1;
            let doc2;
            beforeEach(() => {
                Doctors.remove({});
                doc1 = Factory.create('Doctor');
                doc2 = Factory.create('Doctor');
            });

            describe('doctors.insertDoctor', function() {
                it('inserts a doctor', function(done) {
                    const testData = { placesId: Random.id(), name: 'test', address: 'test', phone: '0000'};
                    insertDoctor.call(testData);
                    const dataFromCollection = Doctors.findOne(testData);
                    delete dataFromCollection._id;
                    assert.deepEqual(dataFromCollection, testData);
                    done();
                });
            });

            describe('doctors.getDoctor', function() {
                it('returns a specific doctor', function(done) {
                    const { placesId } = doc2;
                    const dataFromCollection = getDoctor.call({ placesId });
                    assert.deepEqual(dataFromCollection, doc2);
                    done();
                });
            });

            describe('doctors.getAllDoctors', function() {
                it('returns all doctors', function(done) {
                    assert.equal(getAllDoctors.call().length, Doctors.find({}).count());
                    done();
                });
            });
    
            describe('doctors.doctorExists', function() {
                it('returns true if doctor already exists', function(done) {
                    const { placesId } = doc1;
                    assert.isTrue(doctorExists.call({ placesId }));
                    done();
                });
                it('returns false if doctor does not exists', function(done) {
                    assert.isFalse(doctorExists.call({ placesId: '' }));
                    done();
                });
            });
        });
    });
}