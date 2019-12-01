import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const ContactList = ({contacts, labels}) => {
  const emptyContacts = !Object.values(contacts).reduce((prev, current) => prev || current, false);

  if (emptyContacts) return (<p className="text-secondary">Empty.</p>);

  const showContact = (key, label, link) => (
    link && (
      <Row className="flex-nowrap" key={key}>
        <Col xs={4} md={4} lg={3}><span className="font-weight-bold">{label}:</span></Col>
        <Col className="text-nowrap text-truncate" title={link}><a href={link}>{link}</a></Col>
      </Row>
    )
  );

  const showList = () => (
    [...labels.entries()].map(([key, value]) => showContact(key, value, contacts[key]))
  );

  return (<Container className="px-0 mb-3">{showList()}</Container>);
};

export default ContactList;