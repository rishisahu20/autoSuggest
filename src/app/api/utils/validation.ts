import joi from 'joi';

const querySchema = joi.object({
  lat: joi.number().max(90).min(-90).allow(null),
  long: joi.number().max(180).min(-180).allow(null),
  limit: joi.number().allow(null),
});

export const validateQuery = (queryParams: URLSearchParams) => {
  const queryObject = {
    lat: queryParams.get('lat') !== null ? Number(queryParams.get('lat')) : null,
    long: queryParams.get('long') !== null ? Number(queryParams.get('long')) : null,
    limit: queryParams.get('limit') !== null ? Number(queryParams.get('limit')) : null,
  };

  const { error } = querySchema.validate(queryObject);

  if (error) {
    throw error;
  }

  return queryObject;
};
