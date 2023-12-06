

const fileToImage64 = async (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = (JSON.stringify(fileReader.result));
      resolve(result.substring(1, result.length-1))
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const binaryToImage64 = (data: Array<number>) => {
    const base64 = Buffer.from(data).toString('base64')
    return `data:image/jpeg;base64,${base64}`
}

export {fileToImage64, binaryToImage64};
