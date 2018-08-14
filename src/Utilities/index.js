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

export const isWeixinBrowser = (/micromessenger/i).test(navigator.userAgent)
export const isAPPBrowser = (/pciuser/i).test(navigator.userAgent)
