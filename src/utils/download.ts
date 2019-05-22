import downloadRepo from 'download-git-repo'

export default async function download<T>(
  repository: string,
  destination: string
): Promise<T> {
  return new Promise(
    (resolve, reject): void => {
      downloadRepo(
        repository,
        destination,
        { clone: true },
        (error: Error, data: any): void => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        }
      )
    }
  )
}
