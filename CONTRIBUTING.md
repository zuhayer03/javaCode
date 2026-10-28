# Contributing and practicing GitHub workflows

This is a Java learning repository. Small, focused changes are welcome: explain a concept, improve instructions, or add an exercise with a clear way to run it.

## Work on a branch

```bash
git clone https://github.com/zuhayer03/javaCode.git
cd javaCode
git switch -c practice/describe-your-change
```

Make your change, then inspect it before committing:

```bash
git diff
git status
```

Stage only the files you intended to change, commit them, and publish your branch. For example, when editing the README:

```bash
git add README.md
git commit -m "Clarify the Java learning instructions"
git push -u origin practice/describe-your-change
```

## Open and merge a pull request

1. On GitHub, open a pull request from your branch into `main`.
2. Describe what changed, why, and how you checked it using the template.
3. Read the Files changed tab and resolve any failing checks.
4. For a collaborative change, request a review from a contributor who has access and address their feedback.
5. Merge when the change is ready. Link a completed issue with `Closes #<issue-number>` in the pull-request description.

Documentation-only changes need a careful read of the instructions and links. Java changes should include the command used to compile or run them and the result. Do not describe an exercise as completed until its source has been added and checked.

## Co-authored changes

When two people actually work on a change, credit both contributors. GitHub Desktop can add a co-author, or you can add a `Co-authored-by` trailer to the commit message using the collaborator's GitHub-associated email address. Confirm the identity with that person and check that GitHub shows both authors before merging the pull request.

## Keep changes focused

Do not commit passwords, access tokens, generated class files, or unrelated local files. Keep each pull request about one change so its purpose and validation are easy to understand.
