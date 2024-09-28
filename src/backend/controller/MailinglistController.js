const mailinglistmodel = require('../models/subscribermodel');
const appointmentcontroller = require('./AppointmentController')

const submitmail = async (req,res) =>  {

    await mailinglistmodel.create(req.body);
    res.redirect('/index')

}

const sendmailstoall = async (msg) => {
    console.log('ca,me')
    let allmails = await mailinglistmodel.find({})
console.log(allmails)
    for(let i=0; i < allmails.length; i++){
        console.log(allmails[i].email)

        appointmentcontroller.sendemail(allmails[i].email,'new blog added',`${msg}` )

    }
}


module.exports = {
    submitmail,
    sendmailstoall
}