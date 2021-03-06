
interface JobDetail {
    url: string
    title: string
    company: string
    contact: string
    salary: string
    location: string
    description: string
    fullDescription: string
}

export interface JobApplication {
    job: JobDetail
    coverLetter: string
    cv: string
    notes: string[]
}

export class JobApplications  {
    constructor(private readonly jobApplications: JobApplication[] ) {}

    list(): JobApplication[] {
        return this.jobApplications
    }

    create(jobApplication: JobApplication): void {
        this.jobApplications.push(jobApplication)
    }
}
