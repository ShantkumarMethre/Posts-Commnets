import {Service} from '../services/service';
export const getPosts = async () => {
  let apiRes = await Service.get();
  console.log('api-res', apiRes);
  return apiRes;
};
