const dialog = {};
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const { config } = require("dotenv");
config();

//settings
const projectId = process.env.PROJECT_ID;
let sessionId = null;

dialog.send = async ({ path, client, body }) => {
  const request = {
    session: path,
    queryInput: {
      text: {
        text: body+"",
        languageCode: 'es-ES',
      },
    },
  };
  const responses = await client.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  return result
}
dialog.run = (session) => {
  sessionId = session ?? uuid.v4();
  const sessionClient = new dialogflow.SessionsClient({
    keyFile: process.env.ACCOUNT_FILE_NAME
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  return { path: sessionPath, client: sessionClient }
}

module.exports = dialog;