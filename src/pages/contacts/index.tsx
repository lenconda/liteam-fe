import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch, AnyAction } from 'redux';
import { Card, Row, Col, Input, Collapse } from 'antd';

const { TextArea } = Input;
const { Panel } = Collapse;

interface ContactsPageProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
}

const Contacts: React.FC<ContactsPageProps> = props => {
  const { dispatch } = props;

  return (
    <Row gutter={24}>
      <Col xs={24} sm={10} md={8} xl={6}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="This is panel header 1" key="1">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" disabled>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </Panel>
        </Collapse>
      </Col>
      <Col xs={24} sm={14} md={16} xl={18}>
        <Card title="彭瀚林">
          <TextArea></TextArea>
        </Card>
      </Col>
    </Row>
  );
};

export default Contacts;
