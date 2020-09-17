"use strict";

const ScheduleModel = require("../models/schedule")
var ControllerSchedule = () => {  };

ControllerSchedule.getAll = async (req, res, next) =>
{
    try {
        ScheduleModel.find().then((schedules, err) => {

            if(err) {
                res.send({ message: "No schedules", status: 400 });
            }

            if(!schedules) {
                res.send({ schedules: [], message: "No schedules" });
            }
            res.send({ schedules: schedules });
        });

        
      } catch (err) {
        res.send({ message: "Server error", status: 500 });
      }
    
}

ControllerSchedule.add = (req, res, next) =>
{
    try {
        var schedule = new ScheduleModel({
            shift: req.body.shift,
            date: req.body.active
        });
        
        schedule.save().then((scheduleAdded, err) => {
            if(err)
            {
                var locals = {
                    title:"Error al agregar el registro con shift: " + schedule.shift,
                    description:"Error de Sintaxis SQL",
                    error:err
                }
        
                res.send({ error: locals});
            }
    
            res.send(scheduleAdded)
        });
    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
}

ControllerSchedule.get = async (req, res, next) =>
{
    const scheduleId = req.params.schedule_id;

    ScheduleModel.findOne({ _id: scheduleId }).then((schedule) => {
        res.send({ schedule: schedule });
    });
}

ControllerSchedule.update = async (req, res, next) =>
{
    try {
        const scheduleId = req.params.schedule_id;

        ScheduleModel.findOne({ _id: scheduleId })
        .then((schedule, err) => {
            if(err)
            {
                var locals = {
                    title:"Error al buscar el registro a modidicar con id: " + scheduleId,
                    description:"Error de Sintaxis SQL",
                    error:err
                }
        
                res.send({error: locals});
            } 

            if(!schedule) {
                var locals = {
                    title:"Error al modificar el registro con id: " + scheduleId,
                    description:" Schedule was not found"
                }
        
                res.send({error: locals});
            }
            else {

                schedule.shift = req.body.shift;
                schedule.active = req.body.active;

                schedule.save().then((scheduleUpdated, err) => {
                    res.send(scheduleUpdated)
                }).catch(err => {
                    console.log(err);
                })
            }
        })

    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
}

ControllerSchedule.delete = async (req, res, next) =>
{
    try {
        const scheduleId = req.params.schedule_id;

        ScheduleModel.deleteOne({ _id: scheduleId })
        .then((schedule) => {
            res.send({ message: 'schedule was removed'})
        })

    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
    
}


ControllerSchedule.error404 = (req, res, next) =>
{
    var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error: error
	}

    res.send({ message: locals , status: 404 });
}

module.exports = ControllerSchedule;