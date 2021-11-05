import { ErrorAsyncFunctionWrapper } from '../Constants/errors';

export const asyncFunctionWrapper = (callBack) => async (req, res) => {
  try {
    await callBack(req, res);
  } catch (error) {
    if (!error) res.status(404).send(ErrorAsyncFunctionWrapper.MyDefaultError);
    res.status(500).send(error);
  }
};
