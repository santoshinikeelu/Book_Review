const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.generatePresignedUrl = async (key) => {
    try {
      const client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESSKEYID,
          secretAccessKey: process.env.S3_SECRETACCESSKEY,
        },
      });
      let params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Expires: 900,
      };
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(client, command, { expiresIn: 900 });
      return url;
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw error; // Propagate the error for handling in the caller
    }
  }; 