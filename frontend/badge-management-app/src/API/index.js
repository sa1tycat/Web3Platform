export const getActivity = async () => {
    try {
      const response = await fetch("https://api.campusblock.space/api/activity/view");
      const data = await response.json();
      // 直接返回 'activity' 数组，而不是整个data对象
      return data.activity; 
    } catch (error) {
      console.error("There was a problem fetching the activity data: ", error);
      return []; // 发生错误时返回空数组以避免进一步的错误
    }
  };
  