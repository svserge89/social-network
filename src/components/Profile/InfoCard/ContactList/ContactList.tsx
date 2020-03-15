import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {ContactListProps} from './types';
import resolveBrandIcon from '../../../../utils/resolveBrandIcon';

const ContactList: React.FC<ContactListProps> = ({contacts, labels}) => {

  const emptyContacts = ![...contacts.values()]
    .map(value => !!value)
    .reduce((prev, current) => prev || current, false);

  if (emptyContacts) return (<p className="text-secondary">Empty.</p>);

  const showContact = (key: string, label: string, link?: string | null): JSX.Element | null => (
    link
      ? (
        <Row className="flex-nowrap" key={key}>
          <Col xs={4} md={4} lg={3}><span className="font-weight-bold">
            <FontAwesomeIcon icon={resolveBrandIcon(key)}/>
            &nbsp;{label}:
          </span></Col>
          <Col className="text-nowrap text-truncate" title={link}><a href={link}>{link}</a></Col>
        </Row>
      )
      : null
  );

  const showList = (): Array<JSX.Element | null> => (
    [...labels.entries()]
      .map(([key, value]) => showContact(key, value, contacts.get(key)))
  );

  return (<Container className="px-0 mb-3">{showList()}</Container>);
};

export default ContactList;
