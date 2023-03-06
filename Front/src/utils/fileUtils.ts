export const getImageSize = (imgPath: string) =>
  new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        const { height, width } = img;
        const ratio = width / height;
        resolve({
          ratio,
          height,
          width,
        });
      };
    } catch (error: any) {
      reject(error);
    }
  });

export const convertToBase64 = (file: File): Promise<{ header: string; base64String: string }> =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const [header, base64String] = reader.result.split(',');
          resolve({ header, base64String });
        } else {
          reject('Invalid file');
        }
      };
    } catch (error: any) {
      reject(error);
    }
  });
