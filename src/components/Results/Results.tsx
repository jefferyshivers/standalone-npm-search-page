
import { ResultDetails, ResultTile } from "../ResultTile"
import { Skeleton } from '@material-ui/lab'
import styles from "./styles.module.css"

const LoadingSkeletons = () => {

  return (
    <div className={styles.skeletons}>
      {Array(4).fill(<Skeleton style={{ marginTop: "32px", width: "100%", maxWidth: "1000px", height: "100px" }} variant={"rect"} animation={"wave"} />)}
    </div>
  )
}

export interface SearchDetails {
  query: string,
  results: ResultDetails[]
}

export const Results = ({
  search,
  loading
}: {
  search?: SearchDetails,
  loading: boolean
}) => {

  if (loading) {
    return <LoadingSkeletons />
  }

  if (!search) {
    return null
  }

  const description =
    `${search.results.length} package${search.results.length === 1 ? "" : "s"} found`

  return (
    <div className={styles.results}>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.resultsInnerContainer}>
        {search.results.map(result => (<ResultTile key={result.package.name} details={result} />))}
      </div>
    </div>
  )
}
