interface IActivity{
    name: string,
    description: string,
    type: string,
    questions: [
        {
            description: string,
            options: [
                {
                    id: number,
                    value: string
                }
            ],
            answer: number,
            value: number
        }
    ],
    totalValue: number
}

export default IActivity;