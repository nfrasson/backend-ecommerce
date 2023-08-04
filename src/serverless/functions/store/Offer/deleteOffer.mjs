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
  await Offer.update(
    { deletedAt: new Date() },
    {
      where: {
        OfferID: body.OfferID,
      },
    }
  );

  return { statusCode: 204 };
}, requestBody);
