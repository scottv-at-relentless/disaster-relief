// functions/getMarkers.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const snapshot = await db.collection('markers').get();
    const markers = [];
    snapshot.forEach(doc => {
      markers.push(doc.data());
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(markers),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to retrieve markers' }) };
  }
};