import { Template } from 'meteor/templating';
import { insertAppointment, appointmentExists } from '../api/appointments-service.js';

import './modal.html';

Template.modal.onRendered(function () {
    const sub = Meteor.subscribe('appointments');
    $('.modal').modal({
        dismissible: false,
    });
    $('.datepicker').datepicker({
        onSelect: function(dateText, inst) {
          $("#date").val(dateText);
        },
        format: "yyyy-mm-dd",
        minDate: new Date(),
    });
});

Template.modal.events({
    'click #book'() {
        const { placesId } = this;
        const date = new Date($(`#date-${placesId}`).val());
        const full_name = $(`#full_name-${placesId}`).val();
        const email = $(`#email-${placesId}`).val();
        const doctor_name = $(`#doctor_name-${placesId}`).text();

        if (placesId && date && full_name && email && doctor_name) {
            if (!modalErrors(this)) {
                if (!appointmentExists.call({ placesId, date, full_name, email, doctor_name })) {
                    insertAppointment.call({ placesId, date, full_name, email, doctor_name });
                    clearInputFields(this);
                    M.toast({html: 'Booking successful.'});
                    $(`#modal-${placesId}`).modal('close');
                } else {   
                    M.toast({html: 'Appointment already exists.'});
                }
            } else {
                M.toast({html: 'Please fix invalid field(s).'});
            }
        } else {
            M.toast({html: 'Please fill out all required fields.'});
        }
    },
    'click .modal-close'() {
        clearInputFields(this);
    }
});

function modalErrors(instance) {
    const { placesId } = instance;
    const dateError =  $(`#date-${placesId}`).hasClass('invalid');
    const nameError =  $(`#full_name-${placesId}`).hasClass('invalid');
    const emailError =  $(`#email-${placesId}`).hasClass('invalid');

    return (dateError || nameError || emailError);
}

function clearInputFields(instance) {
    const { placesId } = instance;

    $(`#date-${placesId}`).val('')
    $(`#date-${placesId}`).removeClass('valid');
    $(`#date-${placesId}`).removeClass('invalid');
    $(`label[for=date-${placesId}]`).removeClass('active');

    $(`#full_name-${placesId}`).val('')
    $(`#full_name-${placesId}`).removeClass('valid');
    $(`#full_name-${placesId}`).removeClass('invalid');
    $(`label[for=full_name-${placesId}]`).removeClass('active');

    $(`#email-${placesId}`).val('')
    $(`#email-${placesId}`).removeClass('valid');
    $(`#email-${placesId}`).removeClass('invalid');
    $(`label[for=email-${placesId}]`).removeClass('active');
}