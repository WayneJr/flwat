function myProfile(req, res, next) {
    res.status(200).json({
        "message": "Rule-Validation API",
        "status": "success",
        "data": {
            "name": "Uchechukwu Ahunanya",
            "github": "@WayneJr",
            "email": "uahunanya92@gmail.com",
            "mobile": "08082090998",
            "twitter": "@uche_dev"
        }
    });
}


function validateRule(req, res, next) {
    // checking to make sure the objects are not empty
    if (JSON.stringify(req.body.rule) == "{}" && JSON.stringify(req.body.data) == "{}") {
        return res.status(400).json({
            "message": "Please fill the rule and data fields",
            "status": "error",
            "data": null
        });
    } 
    if (JSON.stringify(req.body.rule) == "{}") {
        return res.status(400).json({
            "message": "rule is required",
            "status": "error",
            "data": null
        });
    }
    if (JSON.stringify(req.body.data) == "{}") {
        return res.status(400).json({
            "message": "data is required",
            "status": "error",
            "data": null
        });
    }

    const testRuleProperties = ["field", "condition", "condition_value"]; // values to test the rule keys validity
    const ruleKeys = Object.keys(req.body.rule); // The rule objects actual keys
    
    // Check to make sure that the properties required are filled
    const missingFields = testRuleProperties.filter(field => !req.body.rule[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({
            "message": `${missingFields[0]} is required`,
            "status": "error",
            "data": null
        });
    }


    // Check if the rule field is an object and it has the required properties
    if ((req.body.rule && typeof req.body.rule === "object") && (ruleKeys.every(field => testRuleProperties.includes(field)))) {

        // destructure the rule property
        const {field, condition, condition_value} = req.body.rule;
        
        function successResponse(fieldName, fieldValue, conditionName, conditionValue) {
            return res.status(200).json({
                "message": `field ${fieldName} successfully validated`,
                "status": "success",
                "data": {
                    "validation": {
                        "error": false,
                        "field": fieldName,
                        "field_value": fieldValue,
                        "condition_name": conditionName,
                        "condition_value": conditionValue
                    }
                }
            })
        }

        function failResponse(fieldName, fieldValue, conditionName, conditionValue) {
            return res.status(400).json({
                "message": `field ${fieldName} failed validation`,
                "status": "error",
                "data": {
                    "validation": {
                        "error": true,
                        "field": fieldName,
                        "field_value": fieldValue,
                        "condition_name": conditionName,
                        "condition_value": conditionValue
                    }
                }
            })
        }

        if (!Object.keys(req.body.data).includes(field)) {
            return res.status(400).json({
                "message": `field ${field} is missing from data`,
                "status": "error",
                "data": null
            })
        }

        if (condition === "eq") { // Check for equality
            return req.body.data[field] === condition_value ? successResponse(field, req.body.data[field], condition, condition_value) : failResponse(field, req.body.data[field], condition, condition_value);
        } else if (condition === "neq") { // check for inequality

            return req.body.data[field] !== condition_value ? successResponse(field, req.body.data[field], condition, condition_value) : failResponse(field, req.body.data[field], condition, condition_value);

        } else if (condition === "gt") { // check if the value is greater than the value entered
            return req.body.data[field] > condition_value ? successResponse(field, req.body.data[field], condition, condition_value) : failResponse(field, req.body.data[field], condition, condition_value);

        } else if (condition === "gte") { // check if the entered value is greater or equal to the data
            return req.body.data[field] >= condition_value ? successResponse(field, req.body.data[field], condition, condition_value) : failResponse(field, req.body.data[field], condition, condition_value);

        } else if (condition === "contains") { // check to see if the entered value is contained in the data

            return req.body.data[field].includes(condition_value) ? successResponse(field, req.body.data[field], condition, condition_value) : failResponse(field, req.body.data[field], condition, condition_value);

        } else {
            return res.status(400).json({
                "message": "condition not valid",
                "status": "error",
                "data": null
            });
        }
    } else if (req.body.rule && typeof req.body.rule !== "object") {
        return res.status(400).json({
            "message": `rule should be an object`,
            "status": "error",
            "data": null
        });
    } else {
        return res.status(400).json({
            "message": "invalid JSON payload passed",
            "status": "error",
            "data": null
        })
    }
}


module.exports = {myProfile, validateRule};