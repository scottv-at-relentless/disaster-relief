// functions/addMarker.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const { lat, lng, type } = JSON.parse(event.body);
    
    await db.collection('markers').add({
      lat,
      lng,
      type,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Marker added successfully" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to add marker' }) };
  }
};