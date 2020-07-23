import instance, {responseData} from './base';
import {FollowResponse, GetFollowedResponse, UnFollowResponse} from './types';

const FOLLOW = '/follow';

const followAPI = {
  get: (userId: number) =>
    instance.get<GetFollowedResponse>(`${FOLLOW}/${userId}`).then(responseData),

  follow: (userId: number) =>
    instance.post<FollowResponse>(`${FOLLOW}/${userId}`).then(responseData),

  unFollow: (userId: number) =>
    instance.delete<UnFollowResponse>(`${FOLLOW}/${userId}`).then(responseData),
};

export default followAPI;
