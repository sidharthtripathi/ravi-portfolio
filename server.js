require('dotenv').config(); // Load environment variables
const express = require('express');
const mailer = require('./mailer'); // Import the transporter from mailer.js
const path = require('path');
const bodyParser = require('body-parser'); // Use bodyParser instead of bodyparser

const app = express();
const port = process.env.PORT || 5000;

 app.use(express.static(path.join(__dirname, 'public')));
 app.set('views',path.join(__dirname,'views'));



//  app.get('/', (req, res) => {
//   console.log("get");
//   res.sendFile(path.join(__dirname, 'public/Index.html')); // Absolute path
// });
app.get('/',(req,res)=>{

  res.sendFile(path.join(__dirname, 'public/Index.html'))
});
app.get('/about',(req,res)=>{

  res.sendFile(path.join(__dirname, 'public/Index.html'))
});
app.get('/skills',(req,res)=>{

  res.sendFile(path.join(__dirname, 'public/Skills.html'))
});
app.get('/winnings',(req,res)=>{

  res.sendFile(path.join(__dirname, 'public/Winnings.html'))
console.log("win")
});
app.get('/hire',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/Hire.html'))
});




// Ensure environment variables are loaded
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

// Use body-parser to parse incoming request bodies (usually for POST requests)
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data

// ... rest of your code for routing and handling other requests ...




// Send email notification (using imported transporter)
app.post('/', (req, res) => {
  console.log("post");
  const { name, email, role, jobDescription, link } = req.body;

  // Now you can access the form data using req.body
 

  const mailData = {
    from: fromEmail,
    to: toEmail,
    subject: 'New Hire Me Inquiry',
    html: `
      <h4>Comapnay/Name: ${name}</h4>
      <h4>Email: ${email}</h4>
      <h4>Your Role: ${role}</h5>
      <h4>Project Description: ${jobDescription}</h4>
      <h4>Website Link: ${link}</h4>
    `
  };

  mailer.sendMail(mailData, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    res.sendFile(path.join(__dirname, 'public/Opps.html'))
      
      // res.status(500).send('Error sending email'); // Inform client about error
    } else {
      console.log('Email sent successfully:', info.messageId);
      // res.status(200).send('Form submitted successfully!'); // Inform client about success
  
    res.sendFile(path.join(__dirname, 'public/Success.html'))
 
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
