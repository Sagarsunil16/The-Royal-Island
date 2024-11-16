const { text } = require('express');
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sneakerhead16.in@gmail.com',
        pass: 'crbv emzv vsjc casx'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const loadHome = async(req,res)=>{
    try {
        res.render('index',{ title: 'The Royal Island' });
    } catch (error) {
        console.log("error loading home page",error.message)
        res.status(500).send("An error occured while loading the home page")
    }
}

loadGallery = async(req, res) => {
    try {
        res.render('gallery',{ title: 'The Royal Island' }); // Ensure that 'gallery.ejs' exists in the correct path
    } catch (error) {
        console.log("Error while loading the Gallery Page", error);
        res.status(500).send("Error while loading the gallery page");
    }
};

loadContact = async(req,res)=>{
    try {
        res.render('contact',{title:'The Royal Island'})
    } catch (error) {
        console.log("Error while loading the contact Page", error);
        res.status(500).send("Error while loading the contact page");
    }
}

const contactUs = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Basic validation to check if all fields are provided
      if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
      }
  
      const mailOptions = {
        from: 'sneakerhead16.in@gmail.com', // Your email address
        to: 'sneakerhead16.in@gmail.com',   // Email where form submissions should go
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };
  
      // Sending the email using nodemailer's transporter
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent: ', info.response);
      return res.status(200).send('Submitted Successfully');
      
    } catch (error) {
      console.error('Error sending email: ', error.message);
      return res.status(500).send('Failed to send reservation details.');
    }
  };
  

const loadAbout = async(req,res)=>{
    try {
        res.render('about',{ title: 'The Royal Island'})
    } catch (error) {
        console.log("Error while loading the About Page", error);
        res.status(500).send("Error while loading the About page");
    }
}



const handleReservation = async(req,res)=>{
const {date, time, people, email,phone} = req.body

// Setup email data
const mailOption = {
    from:'sneakerhead16.in@gmail.com',
    to:'sneakerhead16.in@gmail.com',
    subject:'New Reservation Request',
    text:`Date: ${date}\nTime: ${time}\nNumber of People: ${people}\nEmail: ${email}\nPhone:${phone}`

};
// Send email
transporter.sendMail(mailOption,(error,info)=>{
    if(error){
        console.log("error",error);
        return res.status(500).send('Failed to send reervation details')
    }
    console.log('Email sent',info.response)
    res.send("Reservation Submitted Successfully")
})
};




module.exports={
    loadHome,
    loadContact,
    loadGallery,
    handleReservation,
    contactUs,
    loadAbout
}