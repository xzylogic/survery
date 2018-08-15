export const GetArgsFromHref = (sHref, sArgName) => {
  let args = sHref.split('?')
  let retval = ''

  if (args[0] === sHref) {
    return retval
  }

  let str = args[1]
  args = str.split('&')
  for (let i = 0; i < args.length; i++) {
    str = args[i];
    let arg = str.split('=');
    if (arg.length <= 1) continue
    if (arg[0] === sArgName) retval = arg[1]
  }
  return retval
}

export const GetBrowserType = () => {
  let type = 'app'
  const isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent)
  const isAppBrowser = (/pciuser/i).test(navigator.userAgent)
  isWeixinBrowser && (type = 'wechat')
  isAppBrowser && (type = 'app')
  return type
}

export const GetRedirectUrl = (url) => {
  const redirectUri = encodeURI(url)
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.REACT_APP_APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base#wechat_redirect`
}
