import api from "./api";

export const analyzeReportFile = async (file: File) => {
    const formData = new FormData();
    formData.append("report", file);

    const { data } = await api.post("/ai/analyze", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
