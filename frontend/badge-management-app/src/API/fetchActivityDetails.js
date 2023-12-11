export const fetchActivityDetails = async (activityID) => {
    const url = `https://api.campusblock.space/api/admin/view-activity?activityID=${activityID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return {
          activityInfo: data.activityInfo[0], // 假设API返回的activityInfo数组中只有一个对象
          users: data.users
        };
      } else {
        throw new Error(data.message || 'Failed to fetch the activity details.');
      }
    } catch (error) {
      console.error("There was a problem fetching the activity details: ", error);
      throw error; // 抛出错误，以便调用者可以处理它
    }
  };
  