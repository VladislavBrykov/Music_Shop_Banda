import Joi from 'joi';

async function registrationLoginInputData(body) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(30),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function blocksInputData(body) {
  const schema = Joi.object({
    phoneEmail: Joi.string().min(3).max(30),

    usernameBlockUser: Joi.string().min(3).max(30),

    user: Joi.string().min(3).max(30),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function createAdminInputData(body) {
  const schema = Joi.object({
    phoneEmail: Joi.string().min(3).max(30),

    password: Joi.string().min(3).max(30),

    user: Joi.string().min(3).max(30),

    newToken: Joi.string().min(3).max(300),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function allUsersInputData(body) {
  const schema = Joi.object({
    phoneEmail: Joi.string().min(3).max(30),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function stripePostInputData(body) {
  const schema = Joi.object({
    stripeToken: Joi.string().min(3).max(50),

    stripeTokenType: Joi.string().min(2).max(30),

    stripeEmail: Joi.string().min(3).max(30),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function soundToBasketInputData(body) {
  const schema = Joi.object({
    id_user: Joi.number().min(1),

    id_sound: Joi.string().min(1).max(30),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

async function idUserInputData(body) {
  const schema = Joi.object({
    id_user: Joi.number().min(1),
  });
  const validatorParams = schema.validate(body);
  if (validatorParams.error) {
    throw new Error();
  }
}

const valid = {
  registrationLoginInputData,
  allUsersInputData,
  stripePostInputData,
  soundToBasketInputData,
  idUserInputData,
};

export default valid;
