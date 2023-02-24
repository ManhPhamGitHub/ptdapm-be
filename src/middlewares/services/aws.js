const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
});

const generateUrl = async (filename, bucketPath) => {
    let signedUrl;
    const publicUrl = getPublicUrl(filename, bucketPath);
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${bucketPath}/${filename}`,
        Expires: 6000,
        ACL: 'public-read'
    }
    console.log("params",);
    try {
        signedUrl = await s3.getSignedUrlPromise('putObject', params);
    } catch (err) {
        console.error(`Error generating pre-signed url: ${err.message}`);
        throw new Error('Error generating pre-singed url');
    }

    return {signedUrl, publicUrl};
}

const getPublicUrl = (filename, bucketPath) => {
    const publicUrl = `https://ptdapm-storage.s3.amazonaws.com/assest/image/${filename}`

    return publicUrl;
}

module.exports = {generateUrl};