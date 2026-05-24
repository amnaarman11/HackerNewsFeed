export const mockLikeSave = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 500 + 300;
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Action failed. Please try again.'));
      } else {
        resolve();
      }
    }, delay);
  });
};