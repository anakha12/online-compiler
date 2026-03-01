const compilerService = require("../services/compiler.service");

exports.runCode = async (req, res) => {
  try {
    const { code, languageId } = req.body;

    if (!code || !languageId) {
      return res.status(400).json({ message: "Code and language required" });
    }

    const result = await compilerService.executeCode(code, languageId);

    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output
    });

  } catch (error) {
    res.status(500).json({ message: "Execution failed", error: error.message });
  }
};