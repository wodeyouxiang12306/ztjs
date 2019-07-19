exports.sleep = sleep;
exports.sequence = sequence;

function sleep(ms) {
  if (typeof ms != 'number' || ms < 0) throw '参数ms必须为正整数!!!';
  return new Promise(r => {
    setTimeout(() => r(), Math.floor(ms));
  })
}

/**
 * 
 * @param {*} array 等待排序的数组 
 * @param {*} source 有顺序的以此为标准的数组 
 * @param {assign = false, arrayKey, sourceKey, null=false} option 
 */
function sequence(array, source, option = {}) {
  if (!Array.isArray(array)) throw '第一参数必须为数组!!!';
  if (!Array.isArray(source)) throw '第二参数必须为数组!!!';
  let isObj, cache = {}, result = [];
  for (let item of source) {
    if (typeof item === 'object' && item !== null) {
      isObj = true;
      break;
    };
    if (typeof item === 'string' || typeof item === "number") {
      isObj = false;
      break;
    }
  };
  if (isObj === undefined) throw '第二参数必须为字符串数组、数字数组或者对象数组!!!';

  let { assign = false, arrayKey, sourceKey, null: _null } = option;
  if (arrayKey === undefined) {
    for (let item of array) {
      if (typeof item === 'object' && item !== null) {
        if (item.id !== undefined) {
          arrayKey = 'id';
          break;
        };
        if (item._id !== undefined) {
          arrayKey = '_id';
          break
        }
      }
    }
  };
  if (arrayKey === undefined) throw '请指定arrayKey值';
  if (sourceKey === undefined) sourceKey = arrayKey;

  for (let item of array) {
    if (typeof item === 'object' && item !== null) {
      cache[item[arrayKey]] = item;
    }
  };

  if (isObj) {
    for (let item of source) {
      const obj = cache[item[sourceKey]];
      if (obj === undefined || obj === null) {
        if (_null) result.push(null);
      } else {
        if (assign) {
          result.push(Object.assign(item, obj));
        } else {
          result.push(obj);
        }
      }
    }
  } else {
    for (let item of source) {
      const obj = cache[item];
      if (obj === undefined || obj === null) {
        if (_null) result.push(null);
      } else {
        result.push(obj);
      }
    }
  }

  return result;
}