exports.sleep = sleep;

function sleep(ms) {
  if (typeof ms != 'number' || ms < 0) throw '参数ms必须为正整数!!!';
  return new Promise(r => {
    setTimeout(() => r(), Math.floor(ms));
  })
}