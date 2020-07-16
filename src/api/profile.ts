import instance, {responseData} from './base';
import {
  GetProfileResponse,
  GetStatusResponse,
  UpdatePhotoResponse,
  UpdateProfileResponse,
  UpdateStatusResponse
} from './types';
import {Profile} from '../models/types';

const PROFILE = '/profile';
const PROFILE_STATUS = PROFILE + '/status';
const PROFILE_PHOTO = PROFILE + '/photo';

const profileAPI = {
  get: (userId: number) => instance.get<GetProfileResponse>(`${PROFILE}/${userId}`).then(responseData),

  update: (profile: Profile) => instance.put<UpdateProfileResponse>(PROFILE, profile).then(responseData),

  getStatus: (userId: number) => instance.get<GetStatusResponse>(`${PROFILE_STATUS}/${userId}`).then(responseData),

  updateStatus: (status: string) => instance.put<UpdateStatusResponse>(PROFILE_STATUS, {status})
    .then(responseData),

  updatePhoto: (image: File) => {
    const formData = new FormData();

    formData.append('image', image);

    return instance.put<UpdatePhotoResponse>(
      PROFILE_PHOTO,
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then(responseData);
  }
};

export default profileAPI;
