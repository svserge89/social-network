import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ContactList = ({
  contacts: {
    facebook,
    website,
    vk,
    twitter,
    instagram,
    youtube,
    github,
    mainLink
  }
}) => {
  const emptyContacts = !(
    facebook ||
    website ||
    vk ||
    twitter ||
    instagram ||
    youtube ||
    github ||
    mainLink
  );

  if (emptyContacts) return (<p className="text-secondary">Empty.</p>);

  const showContact = (label, link) => (
    link && (
      <Row className="flex-nowrap">
        <Col xs={5} md={4} lg={3}><strong>{label}:</strong></Col>
        <Col className="text-nowrap text-truncate">{link}</Col>
      </Row>
    )
  );

  return (
    <Container className="px-0 mb-3">
      {showContact("Github", github)}
      {showContact("Facebook", facebook)}
      {showContact("VK", vk)}
      {showContact("Twitter", twitter)}
      {showContact("Instagram", instagram)}
      {showContact("Youtube", youtube)}
      {showContact("Website", website)}
    </Container>
  );
};

export default ContactList;