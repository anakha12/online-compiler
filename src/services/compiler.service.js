const axios = require("axios");

exports.executeCode = async (sourceCode, languageId) => {
  const response = await axios.post(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      source_code: sourceCode,
      language_id: languageId
    }
  );

  return response.data;
};