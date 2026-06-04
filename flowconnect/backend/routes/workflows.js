const express = require("express");
const router = express.Router();

// VARIABLE VALIDATION: Workflow condition logic now validates that all
// referenced variables exist before evaluating conditions. Prevents silent
// failures when variables are undefined or deleted.

function extractVariables(condition) {
  // Extract variable references like {{user.name}}, {{data.value}}
  const matches = condition.match(/\{\{([^}]+)\}\}/g) || [];
  return matches.map((m) => m.slice(2, -2));
}

function validateCondition(condition, availableVariables) {
  const referencedVars = extractVariables(condition);
  const missingVars = [];

  for (const varPath of referencedVars) {
    const rootVar = varPath.split(".")[0];
    if (!availableVariables.includes(rootVar)) {
      missingVars.push(varPath);
    }
  }

  return {
    valid: missingVars.length === 0,
    missingVars,
    error:
      missingVars.length > 0
        ? `Undefined variables: ${missingVars.join(", ")}`
        : null,
  };
}

router.post("/execute", async (req, res) => {
  try {
    const { workflow, inputVariables } = req.body;

    // Validate all conditions before executing workflow
    const errors = [];
    for (const step of workflow.steps || []) {
      if (step.condition) {
        const validation = validateCondition(step.condition, [
          ...Object.keys(inputVariables || {}),
          "context",
          "previousStep",
        ]);

        if (!validation.valid) {
          errors.push({
            step: step.id,
            message: validation.error,
          });
        }
      }
    }

    // Return validation errors immediately, don't execute if variables missing
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Workflow validation failed",
        validationErrors: errors,
      });
    }

    // Workflow is valid, execute it
    res.json({ success: true, message: "Workflow execution started" });
  } catch (error) {
    res.status(500).json({ error: "Workflow execution failed" });
  }
});

module.exports = router;
