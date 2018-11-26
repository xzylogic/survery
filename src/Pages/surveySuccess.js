import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Button} from "antd-mobile";

class Index extends React.Component {

  handleComplete = () => {
    let type = '';
    const isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent);
    const isAppBrowser = (/pciuser/i).test(navigator.userAgent);
    isWeixinBrowser && (type = 'wechat');
    isAppBrowser && (type = 'app');
    console.log('complete');
    switch(type) {
      case 'wechat':
        window.wx.closeWindow();
        return
      case 'app':
        window.location.href = 'patientpci://patient/main';
        return
      default:
        return
    }
  }

  render() {
    const success__container = {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
    const success__content = {
      width: '6rem',
      margin: '0 auto',
      padding: '.3rem 0',
      fontSize: '.36rem',
      lineHeight: '.5rem',
      color: '#666',
      textAlign: 'center',
    };
    const success__buttons = {
      padding: '.3rem .7rem',
    };

    return (
      <div style={success__container}>
        <p style={success__content}>调查已完成，感谢你的参与。</p>
        <div style={success__buttons}>
          <Button type='primary' onClick={this.handleComplete}>确定</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(Index))