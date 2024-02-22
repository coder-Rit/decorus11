var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require('./users');
const contactedUser = require("./contactData")
const localStrategy = require('passport-local');
const nodemailer = require('nodemailer');
// const googleApis = require("googleapis");
// const { google } = require('googleapis');
// const ElasticEmail = require('nodemailer-elasticemail-transport');


passport.use(new localStrategy(userModel.authenticate()));



// Create a Nodemailer transporter with Elastic Email transport
// const transporter = nodemailer.createTransport({
//   host: 'smtp.elasticemail.com',
//   port: 587, // Elastic Email's SMTP port
//   secure: true,
//   auth: {
//     user: 'YOUR_ELASTIC_EMAIL_USERNAME',
//     pass: 'YOUR_ELASTIC_EMAIL_API_KEY',
//   },
//   tls: {
//     ciphers: 'SSLv3',
//     secureProtocol: 'TLSv1_2_method',
//   },
// });


// const transporter = nodemailer.createTransport({
//   service: 'Elastic Email',
//   auth: {
//     user: 'patidar123rishabh@gmail.com',
//     pass: 'AA0795751B6A31030115DF7233BA86B9A84AB439B5871596633A807FD3DCC72A94DDAE43E4D82FC0D730CEAE93BCF3BD',
//   },
// });
// const transporter = nodemailer.createTransport(
//   ElasticEmail({
//     apiKey: 'AA0795751B6A31030115DF7233BA86B9A84AB439B5871596633A807FD3DCC72A94DDAE43E4D82FC0D730CEAE93BCF3BD',
//   })
// );

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     // user: 'patidar123rishabh@gmail.com', // Your Gmail email address
//     user: 'info@decorus.events',
//     // pass: 'ouvv xenw jggt fcrp ', // Your Gmail password (or an App Password if using 2-step verification)
//     pass: 'Decorus@786',
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Replace with your SMTP server (usually provided by your hosting or email service)
  port: 587, // Port number (587 is commonly used for TLS, but check with your provider)
  secure: false, // Set to true if you are using a secure connection (TLS)
  auth: {
    user: 'info@decorus.events', // Your email address
    pass: 'Decorus@786', // Your email password or an App Password if using 2-step verification
  },
});



/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    // User is authenticated
    userModel.findOne({ username: req.session.passport.user })
      .then(function(loggedInUser) {
        if (loggedInUser) {
          // Render the index page with user-specific content
          res.render('index', { loggedInUser });
        } else {
          console.error('User not found in the database.');
          res.status(500).send('Internal Server Error');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated
    // Render the index page with content for non-logged-in users
    res.render('index', { loggedInUser: null });
  }
});

router.get("/about" , function(req,res){
  if (req.isAuthenticated()) {
    // User is authenticated
    userModel.findOne({ username: req.session.passport.user })
      .then(function(loggedInUser) {
        if (loggedInUser) {
          // Render the index page with user-specific content
          res.render('index', { loggedInUser });
        } else {
          console.error('User not found in the database.');
          res.status(500).send('Internal Server Error');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated
    // Render the index page with content for non-logged-in users
    res.render('about', { loggedInUser: null });
  }
})

router.get("/contact" , function(req,res){
  if (req.isAuthenticated()) {
    // User is authenticated
    userModel.findOne({ username: req.session.passport.user })
      .then(function(loggedInUser) {
        if (loggedInUser) {
          // Render the index page with user-specific content
          res.render('index', { loggedInUser });
        } else {
          console.error('User not found in the database.');
          res.status(500).send('Internal Server Error');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated
    // Render the index page with content for non-logged-in users
    res.render('contact', { loggedInUser: null });
  }
})

router.get("/gallery" , function(req,res){
  if (req.isAuthenticated()) {
    // User is authenticated
    userModel.findOne({ username: req.session.passport.user })
      .then(function(loggedInUser) {
        if (loggedInUser) {
          // Render the index page with user-specific content
          res.render('index', { loggedInUser });
        } else {
          console.error('User not found in the database.');
          res.status(500).send('Internal Server Error');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated
    // Render the index page with content for non-logged-in users
    res.render('gallery', { loggedInUser: null });
  }
})

router.get("/services" , function(req,res){
  if (req.isAuthenticated()) {
    // User is authenticated
    userModel.findOne({ username: req.session.passport.user })
      .then(function(loggedInUser) {
        if (loggedInUser) {
          // Render the index page with user-specific content
          res.render('index', { loggedInUser });
        } else {
          console.error('User not found in the database.');
          res.status(500).send('Internal Server Error');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    // User is not authenticated
    // Render the index page with content for non-logged-in users
    res.render('services', { loggedInUser: null });
  }
})

router.get("/login" , function(req,res){
  res.render('login')
})

router.get("/register" , function(req,res){
  res.render('register')
})

router.post("/registerUser" , function(req,res){
  var newUser = new userModel({
    username:req.body.username,
    email:req.body.email,
    mobile:req.body.mobile,
  })
  userModel.register(newUser , req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect("/");
    })
  })
  .catch(function(e){
    res.send(e);
  })
});

router.post("/loginUser" ,passport.authenticate('local' , {
  successRedirect:"/",
  failureRedirect:"/login",
}), function(req,res){})


router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.error(err);
    }
    res.redirect('/login'); // Redirect to the login page or any other desired page
  });
});

router.post('/submit-form', async (req, res) => {

  const userData = req.body;
  console.log(userData)
  const { name, email, message, eventname , number } = userData;

  const contacteduser = new contactedUser(userData);

  // EMAIL FORMATTING

// const emailText = `
// Hello ${userData.username},

// Thank you for contacting us. Your message has been received.

// Event Name: ${userData.eventname}
// Email: ${userData.email}
// Message:
// ${userData.message}

// We will get back to you as soon as possible.

// Best regards,
// The Decorus Events Team
// `;

// const emailHTML = `
// <html>
//   <body>
//     <p>Hello ${userData.name},</p>

//     <p>Thank you for contacting us. Your message has been received.</p>

//     <p><strong>Event Name:</strong> ${userData.eventname}</p>
//     <p><strong>Email:</strong> ${userData.email}</p>
//     <p><strong>Message:</strong></p>
//     <p>${userData.message}</p>

//     <p>We will get back to you as soon as possible.</p>

//     <p>Best regards,<br>The Decorus Events Team</p>
//   </body>
// </html>
// `;

const companyDetails = {
  name: 'Decorus Events',
  email: 'support@decorus.events',
  phone: '+91 9930691076',
  website: 'https://www.decorus.events',
  facebook: 'https://www.facebook.com/profile.php?id=61552267478912&mibextid=LQQJ4d',
  instagram: 'https://www.instagram.com/decorus.events/?utm_source=qr',
};

// const emailHTML = `
//   <html>
//     <head>
//       <style>
//         /* Add your email styles here */
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f4f4f4;
//           margin: 0;
//           padding: 0;
//           text-align: center;
//         }
//         .container {
//           background-color: #ffffff;
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//           border: 1px solid #e0e0e0;
//           border-radius: 5px;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//         }
//         .logo {
//           margin-bottom: 20px;
//         }
//         h1 {
//           color: #333;
//         }
//         p {
//           font-size: 16px;
//           line-height: 1.5;
//           color: #666;
//         }
//         .footer {
//           margin-top: 20px;
//           color: #888;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="logo">
//           <img src="http://localhost:3000/images/logo.png" alt="Company Logo">
//         </div>
//         <h1>Thank You for Contacting Decorus Events</h1>
//         <p>Hello ${userData.username},</p>

//         <p>We appreciate your inquiry. Your message has been received, and our team will review it shortly.</p>

//         <p><strong>Event Name:</strong> ${userData.eventname}</p>
//         <p><strong>Email:</strong> ${userData.email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${userData.message}</p>

//         <p>We will get back to you as soon as possible.</p>

//         <div class="footer">
//           Best regards,<br>
//           The Decorus Events Team
//         </div>
//       </div>
//     </body>
//   </html>
// `;
  
const emailHTML = `
  <html>
    <head>
      <style>
        /* Add your email styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          text-align: center;
        }
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logo {
          margin-bottom: 20px;
        }
        h1 {
          color: #333;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
          color: #666;
        }
        .footer {
          margin-top: 20px;
          color: #888;
        }
        .contact-details {
          margin-top: 20px;
          text-align: left;
        }
        .contact-details p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://ibb.co/YTnkg4S" alt="Company Logo">
        </div>
        <h1>Thank You for Contacting ${companyDetails.name}</h1>
        <p>Hello ${userData.username},</p>

        <p>Thank you for considering Decorus Events for your special occasion! We've received your event inquiry and are thrilled to assist you. Our team is reviewing the details and will get back to you soon to discuss how we can make your event truly spectacular.</p>

        <p><strong>Event Name:</strong> ${userData.eventname}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${userData.message}</p>

        <p>We will get back to you as soon as possible.</p>

        <div class="contact-details">
          <p><strong>Contact Information:</strong></p>
          <p><strong>Email:</strong> ${companyDetails.email}</p>
          <p><strong>Phone:</strong> ${companyDetails.phone}</p>
          <p><strong>Website:</strong> <a href="${companyDetails.website}" target="_blank">${companyDetails.website}</a></p>
          <p><strong>Facebook:</strong> <a href="${companyDetails.facebook}" target="_blank">${companyDetails.facebook}</a></p>
          <p><strong>Twitter:</strong> <a href="${companyDetails.instagram}" target="_blank">${companyDetails.twitter}</a></p>
        </div>

        <div class="footer">
          Best regards,<br>
          The ${companyDetails.name} Team
        </div>
      </div>
    </body>
  </html>
`;

const emailHTML2 = `
  <html>
    <head>
      <style>
        /* Your email styles here */
      </style>
    </head>
    <body>
      <h1>New User Contact Details</h1>
      <table>
        <tr>
          <th>Name</th>
          <td>${userData.username}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${userData.email}</td>
        </tr>
        <tr>
          <th>Mobile Number</th>
          <td>${userData.number}</td>
        </tr>
        <tr>
          <th>Event Name</th>
          <td>${userData.eventname}</td>
        </tr>
        <tr>
          <th>Message</th>
          <td>${userData.message}</td>
        </tr>
      </table>
    </body>
  </html>
`;

  try {
    // Save the user data to the database
    await contacteduser.save();

    // Send a confirmation email to the user
    const userMailOptions = {
      from: 'info@decorus.events', // Sender's email address
      to: userData.email, // User's email address
      subject: ' Thank You for Your Event Inquiry!',
      // text: emailText, // Plain text version
      html: emailHTML, // HTML version
    };

    // Send an email to the user
    await transporter.sendMail(userMailOptions);

    // Send a notification email to the admin
    const adminEmail = 'support@decorus.events'; // Admin's email address
    const adminMailOptions = {
      from: 'info@decorus.events', // Sender's email address
      to: adminEmail,
      subject: 'New User Contact',
      // text: 'A user has contacted you. Details: ' + JSON.stringify(userData),
      html: emailHTML2,
    };

    // Send an email to the admin
    await transporter.sendMail(adminMailOptions);

    // Respond to the client after all operations are completed
    // res.json({ message: 'Emails sent and data saved successfully.' });
    res.redirect('/?submitted=1');
  } catch (error) {
    console.error('Error sending emails or saving data:', error);
    res.status(500).json({ error: 'An error occurred. Emails and data could not be processed.' });
  }
});


// router.post('/submit-form', (req, res) => {
//   const { name, email, message } = req.body; // Form data
//   // Email data
//   const mailOptions = {
//     from: 'your-email@example.com', // Sender's email address
//     to:'shubhampat422@gmail.com', // Recipient's email address
//     subject: 'Contact Form Submission',
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Email could not be sent.' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.json({ message: 'Email sent successfully.' });
//     }
//   });
// });

module.exports = router;
