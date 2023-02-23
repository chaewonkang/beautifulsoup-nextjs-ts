const { GoogleSpreadsheet } = require('google-spreadsheet');
// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file
const creds = require('./key.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet('1HRcPn2M3EnnSGDMK53f95Ra_X1vBE8FOWzhob3ugEGs');

export async function getData() {
  try {
    // google sheets
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    return doc;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}
