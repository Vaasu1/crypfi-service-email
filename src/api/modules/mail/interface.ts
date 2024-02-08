
interface Mail {
    to: string,
    type: string,
    content: {
        data: any
    },
    service: string
}

export default Mail;
