/* 
Copyright (c) 2020 Héctor Olvera Vital
Licensed under the MIT License
*/

class EmailManager {
  /**
  * Enviar correo
  * @param {Object} config Configuration object
  * @param {string} config.name Nombre del remitente
  * @param {string} config.cc Copy
  * @param {string} config.bcc Blind copy
  * @param {boolean} config.noReply True to no replay
  * @param {string} config.replyTo Adress to replay
  * @return {date} Date on sucess
  */
  constructor({
    name,
    cc,
    bcc,
    noReply,
    replyTo }) {

    name ? this.name_ = name : null;
    cc ? this.cc_ = cc : null;
    bcc ? this.bcc_ = bcc : null;
    noReply ? this.noReply_ = true : this.noReply_ = false;
    replyTo ? this.replyTo_ = replyTo : null;
  }

  /**
  * Enviar correo
  * @param {string} htmlFileName Name of HTML template
  * @param {Object} remplazo Object with data to remplace
  * @param {Object} emailObject Email data
  * @param {string} emailObject.name Nombre del remitente
  * @param {string} emailObject.cc Copy
  * @param {string} emailObject.bcc Blink copy
  * @param {boolean} emailObject.noReply True to no replay
  * @param {string} emailObject.replyTo Adress to replay
  * @param {string} emailObject.subject Email subject
  * @param {string} emailObject.to Destinatario
  * @param {array} emailObject.attachments Array of attachments
  * @return {date} Date on sucess
  */
  sendEmailHtml(
    htmlFileName, remplazo,
    { name = this.name_,
      cc = this.cc_,
      bcc = this.bcc_,
      noReply = this.noReply_,
      replyTo = this.replyTo_,
      subject,
      to,
      attachments = [] }) {

    let html = HtmlService.createHtmlOutputFromFile(htmlFileName).getContent();
    html = this.replaceString_(html, remplazo);

    try {
      MailApp.sendEmail({
        name: name,
        subject: subject ? subject : '',
        to: to ? to : bcc,
        cc: cc ? cc : '',
        bcc: bcc,
        htmlBody: html,
        replyTo: replyTo,
        noReply: noReply,
        attachments: attachments,
      });
      return new Date();
    } catch (err) {
      return `Error: ${err}`;
    }
  }

  /**
  * Remplazar String
  * @param {string} str Intrada del html
  * @param {Object} remplazo Objeto con key lo que se va a remplazar, y dato por lo que se remplazará
  * @return {string} Regresa el string con remplazo
  */
  replaceString_(str, remplazo) {
    if (typeof str !== 'string') return undefined;
    if (typeof remplazo === 'undefined') return str;

    let newStr = str;

    Object.keys(remplazo).forEach(key => newStr = newStr.replace(new RegExp(key, "g"), remplazo[key]));

    return newStr;
  }
}
