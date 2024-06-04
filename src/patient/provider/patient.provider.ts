export const PatientProvider = {
  useFactory: () => {
    return {
      returnDuration: (durationInSecs: number) => {
        const currentTime = new Date();
        const newTime = new Date(currentTime.getTime() + durationInSecs * 1000);

        return newTime;
      },
    };
  },
};
