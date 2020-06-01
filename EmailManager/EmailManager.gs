/* 
Copyright (c) 2020 Héctor Olvera Vital
Licensed under the MIT License
*/

class EmailManager {
  /**
  * Send mail manager
  * @param {object} [config] config object
  * @param {string} [config.name] name from default
  * @param {string} [config.cc] cc email default
  * @param {string} [config.bcc] bcc email default
  * @param {boolean} [config.noReply] true to no replay default
  * @param {string} [config.replyTo] replay email default
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
  * Send mail method
  * @param {string} htmlFileName Name of HTML template
  * @param {object} replace Object with data to replace
  * @param {object} emailObject email data
  * @param {string} emailObject.name name from
  * @param {string} emailObject.cc cc email
  * @param {string} emailObject.bcc bcc email
  * @param {boolean} emailObject.noReply True to no replay
  * @param {string} emailObject.replyTo replay email
  * @param {string} emailObject.subject Email subject
  * @param {string} emailObject.to email
  * @param {array} emailObject.attachments Array of attachments
  * @return {date} Date on success
  */
  sendEmailHtml(
    htmlFileName, replace,
    { name = this.name_,
      cc = this.cc_,
      bcc = this.bcc_,
      noReply = this.noReply_,
      replyTo = this.replyTo_,
      subject,
      to,
      attachments = [] }) {
    let html = HtmlService.createHtmlOutputFromFile(htmlFileName).getContent();
    html = this.replaceString_(html, replace);

    try {
      MailApp.sendEmail({
        name: name,
        subject: subject ? subject : '',
        to: to ? to : '',
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
  * Replaces a string
  * @param {string} str input string
  * @param {Object} replace object with replaces
  * @return {string} replaced string
  */
  replaceString_(str, replace) {
    if (typeof str !== 'string') return undefined;
    if (typeof replace === 'undefined') return str;
    let newStr = str;

    Object.keys(replace).forEach(key => newStr = newStr.replace(new RegExp(key, "g"), replace[key]));

    return newStr;
  }
}
