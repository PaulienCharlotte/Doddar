
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const { timestamp, modelVersion, pseudonymConfirmed, analysisType } = data;

        if (!timestamp || !modelVersion) {
            return { statusCode: 400, body: 'Missing required metadata' };
        }

        // Initialize the 'audit-logs' store
        // Note: Netlify Blobs requires the site to be connected to Netlify
        // In local dev without netlify login, this might rely on local mock or fail if not configured.
        // We assume standard Netlify environment or properly configured dev environment.
        const store = getStore('audit-logs');

        // Create a unique key for the log entry
        const key = `${new Date(timestamp).toISOString()}-${Math.random().toString(36).substring(2, 9)}`;

        // Write the data to the blob store
        await store.set(key, JSON.stringify(data));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Audit log created successfully', id: key }),
        };
    } catch (error) {
        console.error('Audit Log Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create audit log', details: error.message }),
        };
    }
};
