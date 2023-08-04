import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestBody = Joi.object({
  OfferID: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .required(),
});

export const handler = lambdaProcessor(async (body) => {
  const offer = await Offer.findOne({
    where: {
      OfferID: body.OfferID,
    },
  });

  return { statusCode: 200, body: offer };
}, requestBody);
