# github-action-check-files-changed

Github action to check whether certain files have changed between versions. Can be use to conditionally run steps/ jobs only if needed. Example being migrations only running when there are changes in the migrations folder.

## Usage

```
uses: spotlight-ar/github-action-check-files-changed@v1.0
with:
  paths: 'src/**.*'
  version: 'v1.5.0'
```

## Variables

### Inputs:

| Variable | Description                                       | Required? |
| -------- | ------------------------------------------------- | --------- |
| paths    | The file path to compare to                       | true      |
| version  | The version to compare to (defaults to previous). | false     |

### Outputs:

| Variable | Description                                     |
| -------- | ----------------------------------------------- |
| changes  | 'True' if there are changes, 'False' otherwise. |
