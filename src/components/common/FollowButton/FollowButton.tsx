import React from 'react';
import {faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons';

import {FollowButtonProps} from './types';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';

const FollowButton: React.FC<FollowButtonProps> = ({
                                                     followed,
                                                     follow,
                                                     unfollow,
                                                     following = false
                                                   }) => {
  if (following) return (<ButtonLoader/>);

  return followed
    ? (<ButtonWithIcon variant="danger" icon={faHeartBroken} onClick={unfollow}>Unfollow</ButtonWithIcon>)
    : (<ButtonWithIcon variant="success" icon={faHeart} onClick={follow}>Follow</ButtonWithIcon>);
};

export default FollowButton;
