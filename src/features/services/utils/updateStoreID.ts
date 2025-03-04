const updateStoreID = (
  storeID: string[] | undefined,
  storeNum: string,
  checked: boolean
): string[] => {
  let updatedStoreID: string[] = [];
  if (storeID) {
    updatedStoreID = [...storeID];
    if (checked) {
      storeID.includes(storeNum) ? null : updatedStoreID.push(storeNum);
    } else {
      let tempArray: string[] = [];
      storeID.includes(storeNum)
        ? (tempArray = updatedStoreID.filter((store) => store !== storeNum))
        : (tempArray = updatedStoreID);
      updatedStoreID = tempArray;
    }
  } else if (checked) {
    updatedStoreID = [storeNum];
  }
  return updatedStoreID;
};

export default updateStoreID;
