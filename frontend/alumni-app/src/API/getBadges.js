// getBadges.js
const getBadges = async (userID) => {
    try {
      const response = await fetch(`https://api.campusblock.space/api/alumni/view-badges?userID=${userID}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching badges failed:", error);
      return null; // 或者可以返回错误信息
    }
  };
  
  export default getBadges;
  