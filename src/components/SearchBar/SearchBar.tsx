import { useState } from "react"
import styles from "./styles.module.css"

export const SearchBar = ({
  disabled,
  handleSubmit
}: {
  disabled: boolean,
  handleSubmit: (value: string) => void
}) => {
  const [value, setValue] = useState<string>("")
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(value) }}>
        <input
          className={styles.input}
          value={value}
          placeholder={"Search packages"}
          onChange={e => setValue(e.target.value)}
          disabled={disabled}
        />
        <button disabled={disabled} className={styles.submit}>Search</button>
      </form>
    </div>
  )
}
