export const convertOptions = (array) => {
    const mappedArray = array.map((item) => ({
      label:
        item.typeName ||
        item.levelName ||
        item.statusName ||
        item.classRoomName ||
        item.fullName ||
        item.termName ||
        item.techName,
      value: item.id || item.teacherId,
    }));
  
    return mappedArray;
  };