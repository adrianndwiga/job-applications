import { DownloadJobDetails } from 'job-detail'
import { loadJob, CssConfig } from 'job-detail/load-job-details'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { JobApplication } from '.'

function create(outputFilePath: string, jobAppliation: JobApplication): void {
    mkdirSync(outputFilePath, {recursive: true})
    writeFileSync(`${outputFilePath}/data.json`, JSON.stringify(jobAppliation, null, 4), 'utf8')
}

if (process.argv[2].startsWith('create')) {
    const createUrl: string = process.argv[2].replace('create:', '')
    const configUrl: string = process.argv[3].replace('config:', '')
    const css: CssConfig = JSON.parse(readFileSync(configUrl, 'utf8'))
    const outputUrl = process.argv[4].replace('output:', '')

    const download = new DownloadJobDetails([createUrl], [])
    download
        .load()
            .then(result => {
                const job = loadJob(css, result[0])
                create(outputUrl, { job: {
                    url: result[0].url,
                    title: job.title,
                    company: job.company,
                    contact: job.contact,
                    salary: job.salary,
                    description: job.description,
                    fullDescription: result[0].content,

                }} as JobApplication)
            })
} else if (process.argv[2].startsWith('extract')) {
    const dir = process.argv[2].replace('extract:', '')
    const data: JobApplication = JSON.parse(readFileSync(`${dir}/data.json`, 'utf8'))

    writeFileSync(`${dir}/job-summary.html`, data.job.description, 'utf8')
    writeFileSync(`${dir}/job-detail.html`, data.job.fullDescription, 'utf8')
    writeFileSync(`${dir}/cover-letter.md`, '', 'utf8')
}
