import React, { useEffect, useState } from 'react';
import { search } from "./api"
import { Results, SearchDetails } from './components/Results';
import { ResultDetails } from './components/ResultTile';
import { SearchBar } from './components/SearchBar';
import styles from "./styles.module.css"

type Status = "idle" | "loading"

export const App = () => {
  const [mode, setMode] = useState<"light"|"dark">("light")
  const [searchDetails, setSearchDetails] = useState<SearchDetails | undefined>()
  const [failure, setFailure] = useState<boolean>(false)

  const [status, setStatus] = useState<Status>("idle")

  const fetchResults = async (query: string): Promise<void> => {
    setStatus("loading")
    setFailure(false)
    try {
      const results = await search(query)
      setSearchDetails({
        query,
        results
      })
    } catch (err) {
      setFailure(true)
    }

    // Add a small buffer so that the loading animation isn't jarring if things load quickly.
    setTimeout(() => {
      setStatus("idle")
    }, 250)
  }

  const switchMode = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode])

  return (
    <div>
      <header className={styles.header}>
        <p>
          This page was created using React (via create-react-app) and Typescript.
        </p>
        <p>
          To invoke a (fake) failure, search "fail".
        </p>
        <p>
          You are currently in {mode} mode.{" "}
          <button className={styles.switchMode} onClick={() => switchMode()}>
            Switch to {mode === "light" ? "dark" : "light"} mode.
          </button>
        </p>
      </header>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Search for NPM packages</h1>
      </div>

      <SearchBar
        disabled={status === "loading"}
        handleSubmit={fetchResults}
      />

      {!failure && <Results
        loading={status === "loading"}
        search={searchDetails}
      />}

      {failure && (
        <div className={styles.failureContainer}>
          <p className={styles.failureMessage}>
            Something went wrong. Try again?
          </p>
        </div>
      )}
    </div>
  );
}
