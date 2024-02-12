export const fileSizeTest = (
  value: FileList | File,
  maxSize: number,
  required: boolean
) => {
  let totalSize = 0;
  if (!required) {
    return true;
  } else if (value instanceof File) {
    totalSize += value.size;
  } else {
    for (let i = 0; i < value.length; i++) {
      totalSize += value[i].size;
    }
    if (totalSize > maxSize * 1024 * 1024) {
      return false;
    }
  }
  return true;
};

export const fileExtensionTest = (
  value: FileList | File,
  extensions: string[],
  required: boolean
) => {
  if (!required) {
    return true;
  } else if (value instanceof File) {
    console.log(value instanceof File);
    const extension = value.type.split("/")[1];
    if (!extension) return false;
    if (!extensions.includes(extension.toLowerCase())) {
      return false;
    }
    return true;
  } else {
    for (let i = 0; i < value.length; i++) {
      const extension = value[i].type.split("/")[1];
      if (!extension) return false;
      if (!extensions.includes(extension.toLowerCase())) {
        return false;
      }
    }
    return true;
  }
};
