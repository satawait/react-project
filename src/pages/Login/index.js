import { Card, Form, Input, Checkbox, Button, message } from "antd"
import logo from "@/assets/imgs/logo.png"
import './index.scss'
import useStore from "@/store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = async values => {
    console.log(values)
    await loginStore.setToken({
      mobile: values.mobile,
      code: values.code
    })
    message.success('登录成功')
    navigate('/', { replace: true })
  }
  const onFinishFailed = values => {
    console.log(values)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img src={logo} className="login-logo" alt="" />
        <Form
          initialValues={{
            remember: true
          }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='mobile'
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
              {
                required: true,
                message: '请输入手机号'
              }
            ]}>
            <Input maxLength="11" size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              {
                required: true,
                message: '请输入验证码'
              }
            ]}>
            <Input maxLength="6" size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}
export default observer(Login)