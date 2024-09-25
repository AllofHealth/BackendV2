export const PatientProvider = {
  useFactory: () => {
    return {
      returnDuration: (durationInSecs: number) => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + durationInSecs * 1000);
      },
    };
  },
};
