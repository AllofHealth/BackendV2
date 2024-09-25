"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProvider = void 0;
exports.PatientProvider = {
    useFactory: () => {
        return {
            returnDuration: (durationInSecs) => {
                const currentTime = new Date();
                return new Date(currentTime.getTime() + durationInSecs * 1000);
            },
        };
    },
};
//# sourceMappingURL=patient.provider.js.map