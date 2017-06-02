var nodemailer = require('nodemailer'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mavzolej.master@gmail.com',
    pass: '0504065007'
  }
});

exports.send = (req, res) => {
  /*var form = new formidable.IncomingForm();
  var text,
    price,
    items,
    photos = [],
    newFolder;

  form.on('field', function (name, val) {
    if(name == 'text')
      text = val;
    if(name == 'price')
      price = val;
    if(name == 'items')
      items = val.map(function(elem){
        return '<span>{elem.name}: {elem.description}</span>';
      });
  });

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../media/photos');

  form.on('file', function(field, file) {
    newFolder = path.join(__dirname, '../media/photos');

    if (!fs.existsSync(newFolder)){
      fs.mkdirSync(newFolder);
    }

    photos.push(file.name);
    fs.rename(file.path, path.join(newFolder, file.name));

  });


  var mailOptions = {
    from: '"Fred Foo " <foo@blurdybloop.com>', // sender address
    to: 'mavzolej-master@yandex.ru', // list of receivers
    subject: 'Заказ памятника', // Subject line
    text: text, // plain text body
    html: items + ' Embedded image: <img src="cid:unique@nodemailer.com"/>', // html body
    date: new Date('2000-01-01 00:00:00'),
    attachments: photos.map(function (elem) {
      return {
        filename: elem,
        path: newFolder,
        cid: 'unique@nodemailer.com' //same cid value as in the html img src
      }
    }),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({error: error});
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return res.json({success: 'successful sanded'});
  });*/

};