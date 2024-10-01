// functions/deleteMarker.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const { id } = JSON.parse(event.body);
    
    await db.collection('markers').doc(id).delete();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Marker deleted successfully" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete marker' }) };
  }
};