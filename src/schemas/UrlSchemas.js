import joi from "joi";

const urlsSchema = joi.object({
    url: joi.string().uri().required(),
});

export default urlsSchema;