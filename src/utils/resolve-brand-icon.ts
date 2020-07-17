import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {
  faGithub,
  faFacebook,
  faVk,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {faLink} from '@fortawesome/free-solid-svg-icons';

const iconMap = new Map<string, IconDefinition>(
  [
    ['github', faGithub],
    ['facebook', faFacebook],
    ['vk', faVk],
    ['twitter', faTwitter],
    ['instagram', faInstagram],
    ['youtube', faYoutube],
  ]
);

const resolveBrandIcon = (name: string): IconDefinition => iconMap.get(name) || faLink;

export default resolveBrandIcon;
