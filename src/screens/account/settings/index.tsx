import {Button, Form, Input} from 'antd';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function SettingsComponent(props: any) {
  const history = useHistory();

  props = useSelector<any>((state) => ({
    ...props,
    account: state.screen.accountReducer.data,
  }));

  const [state, setState] = useState<any>({
    name: '',
  });

  const _onChangeText = (stateVar: string) => (evt: any) => {
    setState((state) => ({
      ...state,
      [stateVar]: evt.target.value,
    }));
  };
  const account = useSelector((state: any) => state.screen.accountReducer);

  const onFinish = () => {
    account.data.name = state.name;
    history.push('/home');
  };

  return (
    <>
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item initialValue={props.account.name} name={['user', 'name']} label="Name" rules={[{required: true}]}>
          <Input onChange={_onChangeText('name')} />
        </Form.Item>
        <Form.Item initialValue={props.account.email} name={['user', 'email']} label="Email" rules={[{type: 'email'}]}>
          <Input disabled />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
