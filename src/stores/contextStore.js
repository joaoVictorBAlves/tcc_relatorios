import { create } from 'zustand';

const useSelectionStore = create((set) => ({
    assessment: { id: null, title: '' },
    exam: { id: null, name: '' },
    school: { id: null, name: '' },
    class: { id: null, name: '' },
    agroupedQuestions: false,
    agroupedStudents: false,
    setAssessment: (id, title) => set(() => ({ assessment: { id, title } })),
    setExam: (id, name) => set(() => ({ exam: { id, name } })),
    setSchool: (id, name) => set(() => ({ school: { id, name } })),
    setClass: (id, name) => set(() => ({ class: { id, name } })),
    setAgroupedQuestions: (value) => set(() => ({ agroupedQuestions: value })),
    setAgroupedStudents: (value) => set(() => ({ agroupedStudents: value })),
}));

export { useSelectionStore };