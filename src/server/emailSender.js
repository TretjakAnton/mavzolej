var nodemailer = require('nodemailer');
var formidable = require('formidable'),
  path = require('path'),
  fs = require('fs');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mavzolej.master@gmail.com',
    pass: '0504065007'
  }
});

function getHtml(items) {
  let HTML = [];
  Object.values(items).map((el) => {
    if (el.name != null) {
      HTML.push(`<tr><td>${el.name} : ${el.description}<td></tr>`);
    }
  })
  return HTML;
}

function getImages(images) {
  if(images && images.length > 0){
    return images.map(function (elem) {
      return {
        path: elem,
      }
    });
  } else {
    return null;
  }
}

exports.send = (req, res) => {
  var mailOptions = {
    from: 'mavzolej.master@gmail.com',
    to: 'mavzolej.master@gmail.com', //tretjak.anton.dev@gmail.com
    subject: 'Заказ памятника', // Subject line
    html: `
      <table>
        <tr><td>номер памятника: ${req.body.id}</td></tr>
        <tr><td>тип памятника: ${req.body.type}</td></tr>
        <tr><td>цена ${req.body.price}</td></tr>
        ${getHtml(req.body.items)}
        <tr><td>текст: ${req.body.text}</td></tr>
        <tr><td>email: ${req.body.email}</td></tr>
      </table>`,
    date: new Date('2000-01-01 00:00:00'),
    attachments: getImages(req.body.images),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ error: error });
    } else {
      return res.json({ success: 'successful sanded' });
    }
  });
}