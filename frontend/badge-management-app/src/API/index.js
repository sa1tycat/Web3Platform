export const getActivity =  () => {
      const response =  fetch("https://api.campusblock.space/api/activity/view");
      const data =  response.json();
      // 直接返回 'activity' 数组，而不是整个data对象
      return data.activity; 
  };