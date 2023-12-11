export const getActivity = async () => {
    const url = `https://api.campusblock.space/api/activity/view`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return data.activity; // 如果成功，返回 'activity' 数组
      }
      throw new Error('Failed to load activities'); // 如果不成功，抛出错误
    } catch (error) {
      console.error("There was a problem fetching the activity data: ", error);
      return []; // 发生错误时返回空数组以避免进一步的错误
    }
  };
  