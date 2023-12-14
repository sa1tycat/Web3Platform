const processAndSendData = (collectedReturnValues, badgesCreation) => {
  // 将collectedReturnValues转换为期望的数组格式
  const returnValuesArray = Object.values(collectedReturnValues).flat();

/*   console.log('收集到的返回值数组:', returnValuesArray);
  console.log('收集到的返回值数组的第一个元素:', returnValuesArray[0]);
  console.log('收集到的返回值数组的第一行第一个元素:', returnValuesArray[0][0]);//这是我们匹配的数组
  console.log('收集到的返回值数组的第一面第一行第一个元素:', returnValuesArray[0][0][0]); */
  const returnValuesArray1 = returnValuesArray[0][0];
/*   console.log('需要匹配的数组:', badgesCreation); */

  // 处理返回值并与badgesCreation匹配
  const processedBadges = returnValuesArray1.map(returnValue => {
  // 由于returnValue是对象，可以直接访问其属性
  const badgeID = Number(returnValue.badgeID);  // 转换BigInt为Number
  const tokenID = Number(returnValue.tokenID);  // 转换BigInt为Number

/*   console.log('badgeID', badgeID); */
  // 查找与badgeID匹配的badgesCreation条目
  const badgeCreation = badgesCreation.find(b => b.badgeID === badgeID);

  // 如果找到匹配项，则创建新的对象
  if (badgeCreation) {
    return {
      badgeID: badgeCreation.badgeID,  // 这里可以直接使用badgeID，因为已经确保类型匹配
      userID: badgeCreation.userID,    // 使用找到的条目中的userID
      tokenID: tokenID                 // 使用转换后的tokenID
    };
  }
  
  // 如果没有找到匹配项，则返回null
  return null;
}).filter(Boolean); // 过滤掉null值，保留有效对象

  
  
 /*  console.log('将要发送给后端的数据:', processedBadges); */
  // 发送处理后的数据到后端API
  // 显示加载弹窗
  alert('正在发送数据到后端，请稍候...');

  fetch('https://api.campusblock.space/api/admin/update-badges-tokenID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ badges: processedBadges })
  })
  .then(response => response.json())
  .then(data => {
    // 隐藏加载弹窗
    console.log('成功发送数据到后端:', data);
    alert('成功发送数据到后端: ' + JSON.stringify(data)); // 将数据转换为字符串格式显示在弹窗中
  })
  .catch(error => {
    // 隐藏加载弹窗并显示错误消息
    console.error('发送数据到后端出错:', error);
    alert('发送数据到后端出错: ' + error.message); // 显示错误消息
  });
};

export default processAndSendData;
