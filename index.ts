
interface JobDetail {
    url: string
    title: string
    company: string
    contact: string
    salary: string
    description: string
}

interface JobApplication {
    job: JobDetail
    coverLetter: string
    cv: string
    notes: string[]
}

export class JobApplications  {
    private readonly applications: JobApplication[]

    add(): void {
        
    }
}
