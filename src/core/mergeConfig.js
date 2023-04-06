/**
 *
 * @param {Object} config1
 * @param {Object} config2
 * @return {Object} 将config2合并到config1
 */
const strats = Object.create(null);

export default function mergeConfig(config1, config2) {
  if(!config2){
    config2 = {};
  }
  
  let config = Object.create(null);

  // 遍历用户配置
  for(let key in config2) {

  }

  function mergeField(key) {

  }
  return config
}