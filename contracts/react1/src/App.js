import React, { useState, useEffect } from 'react';
import { mintBadges } from './mintBadges'; // Adjust the path as needed


const MyComponent = () => {
  const [badgeInfo, setBadgeInfo] = useState([]);
  useEffect(() => {
    // Initialize `badgeInfo` with actual data
    setBadgeInfo([
      // ... Your badge data ...
      {
        badgeID: 170,
        recipient: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        metadataURI: "https://api.campusblock.space/files/jsons/metadata-1-1-1702399369983.json",
      },
      {
        badgeID: 172,
        recipient: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
        metadataURI: "https://api.campusblock.space/files/jsons/metadata-4-1-1702399369993.json",
      }
    ]);
  }, []);
  

  const handleMint = () => {
    if (badgeInfo.length > 0) {
      mintBadges(badgeInfo, (mintData) => {
        console.log('Mint data received:', mintData);
      // Further processing of mintData as needed
    });
  } else {
    console.log("badgeInfo is not initialized yet.");
  }
};


  return (
    <div>
      <button onClick={handleMint}>Mint Badges</button>
      {/* Other component content */}
    </div>
  );
};
export default MyComponent;

