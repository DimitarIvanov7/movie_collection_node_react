import Joi from "joi";
//username must be a string between 5 and 30 chars. Password much be a string min 10 chars long
export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(5).max(30).required(),
        password: Joi.string().min(10).required(),
    }).unknown();
    return schema.validate(data);
};
//# sourceMappingURL=requestValidation.js.map