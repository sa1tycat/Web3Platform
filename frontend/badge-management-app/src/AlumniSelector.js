// AlumniSelector.js
import React, { useState } from 'react';
import { Checkbox, List } from 'antd';

const AlumniSelector = ({ onAlumniSelect }) => {
  const [selectedAlumni, setSelectedAlumni] = useState([]);

  const handleSelect = (alumnus, checked) => {
    const updatedSelected = checked
      ? [...selectedAlumni, alumnus]
      : selectedAlumni.filter(item => item !== alumnus);
    setSelectedAlumni(updatedSelected);
    onAlumniSelect(updatedSelected);
  };

  // 模拟的校友数据
  const alumniList = [{ id: 1, name: '校友1' }, { id: 2, name: '校友2' }];

  return (
    <List
      header={<div>选择校友</div>}
      bordered
      dataSource={alumniList}
      renderItem={item => (
        <List.Item>
          <Checkbox
            checked={selectedAlumni.includes(item)}
            onChange={(e) => handleSelect(item, e.target.checked)}
          >
            {item.name}
          </Checkbox>
        </List.Item>
      )}
    />
  );
};

export default AlumniSelector;
