/**
 * 返回一个在ms毫秒后resolve的Promise对象
 * 
 * @param ms 等待的毫秒数
 * @returns {Promise} a new instance of Promise
 */
export function sleep(ms: number) {
  if (typeof ms != 'number' || ms < 0) throw '参数ms必须为正整数!!!';
  return new Promise<void>(r => {
    setTimeout(() => r(), Math.floor(ms));
  })
}
