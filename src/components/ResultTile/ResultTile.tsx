
import { PackageSearchResult } from "../../api"
import styles from "./styles.module.css"

// TODO don't reuse the same exact schema as the API?
export type ResultDetails = PackageSearchResult

export const ResultTile = ({
  details
}: {
  details: ResultDetails
}) => {

  return (
    <div className={styles.resultTile}>
      <div>
        <a className={styles.name} href={details.package.links.npm}>{details.package.name}</a>
      </div>
      <div className={styles.description}>{details.package.name}</div>
      <div className={styles.metadata}>
        <a href={`https://www.npmjs.com/~${details.package.publisher?.username}`}
          className={styles.publisherName}>
          {details.package.publisher?.username}
        </a>
        <div>published {details.package.version}</div>
      </div>
    </div>
  )
}
