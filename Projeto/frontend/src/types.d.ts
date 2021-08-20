interface IUser {
    _id: string
    name: string
    email: string
    userType: string
}

interface IStudent {
    _id: string
    user: IUser
    favorites: Array<string>
    subjects: [IStudentSubject]
}

interface IStudentSubject {
    _id: string
    subject: string
    situation: string
    start: string
    end: string
}

interface ITeacher {
    _id: string
    user: IUser
    description: string
}

interface ISubject {
    _id: string
    subjectName: string
    subjectDescription: string
    classes: [IClass]
    slides: [IFile]
    activities: [IActivity]
    teacher: ITeacher
    students: number
}

interface IClass {
    _id: string
    name: string
    path: string
}

interface IFile {
    _id: string
    name: string
    path: string
}

interface IActivity {
    _id: string
    name: string
    description: string
    type: string
    questions: [IQuestion]
    totalValue: number
    answers: [string]
}

interface IQuestion {
    _id: string
    description: string
    options: [IOption]
    answer: number
    value: number
}

interface IOption {
    _id: string
    id: number,
    value: string
}

interface IAnswer{
    _id: string
    user: string
    subject: string
    activity: string
    totalGrade: number
    questions: [
        {
            question: string
            optionID: number
            grade: number
        }
    ]
}