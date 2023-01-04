# Welcome to the Pluto contributing guide

Thank you for investing your time in contributing to our project! If you ever have any questions, feel free to contact us on [LinkedIn](https://www.linkedin.com/company/pluto-open-source-team/) or via email to [pluto-open-source-team@googlegroups.com](mailto:pluto-open-source-team@googlegroups.com).

That said, here are some pointers to get you started 🎊

## Code of conduct

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

Pluto is really two projects: One for the user interface (what you see in [our demo environment](https://pluto.chromebook.cloud/) or when you start a dev server), as well as a set of library functions that allow us to communicate with Google's servers.

You'll find much of the UI code in `src/`, and specifically the API implementations for communicating with Google servers in `src/lib/`.

We are super happy for any contribution you choose to make. This does not have to be programming code.

### Discussions

Discussions are often where the real work happens. Feel free to drop your thoughts in [our discussions](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/discussions). If you're not confident in sharing your thoughts publicly, you can also find us on [LinkedIn](https://www.linkedin.com/company/pluto-open-source-team/) and via email at [pluto-open-source-team@googlegroups.com](mailto:pluto-open-source-team@googlegroups.com).

### Issues

#### Create a new issue

If you spot a problem, have a feature idea, or encounter a bug, first [search whether an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can [open a new one here](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/issues/new/choose).

#### Solve an issue

[Check out our existing issues here](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/issues). Issues are labeled by our team. In general, the [`good first issue`](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+) and [`help wanted`](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) labels are good places to start.

As a rule of thumb, please don't assign issues to people unless you know why.

When you've found an issue to work on, you're welcome to open a PR with a fix.

### Make changes

To add some changes to Pluto, unless you're a maintainer, you'll want to fork it first. There, you can create all manner of changes (for instance, a feature branch), and then later merge it back into our repo (usually referred to as "upstream").

#### Test driven development

Before making any functional code changes, you'll usually want to add a test that requires the changes you're looking to perform. This way, we're continually building more and more tests, and whenever we make a functional code change, all of our previous tests will verify that nothing broke (regression).

For more information on TDD, [check out this wiki article](https://en.wikipedia.org/wiki/Test-driven_development).

This way of working also makes it clear why we're building certain features. In a prototypical case, there'll be a discussion, followed by an issue, which will prompt a contributor to tackle it. They will write tests, which will force functional code to be written. There's a clear chain of motivation and we don't produce [waste](https://theleanway.net/The-8-Wastes-of-Lean).

#### Functional Core, Imperative Shell

When adding code, especially enhancements, keep this principle in mind. It will produce more readable code, and help others understand what you had to do and why.

FCIS and TDD also interact in an interesting way. One criticism of TDD is that it's hard to decide when to start and stop testing things (ie when tests become too fine-grained and rigid). Splitting code into core and shell can counteract this problem of TDD to a certain degree by allowing us to test rigorously in the core, and avoid wasting time in the shell by just writing basic [smoke tests](<https://en.wikipedia.org/wiki/Smoke_testing_(software)>).

There's a great [talk called Boundaries](https://www.destroyallsoftware.com/talks/boundaries) by Gary Bernhardt from SCNA 2012 that explains the benefits of combining FCIS with TDD.

### Commit your update

#### Commit messages

Please follow the spirit of [these guidelines when writing commit messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/).

In short:

1. Capitalize the first word of the message.
2. Use imperative mood (ie complete the sentence "This, commit, when applied, will...")
3. Use 50 characters max on the first line, leave one empty, and then use 72 characters max on subsequent lines.
4. Explain why you're adding the change, not what - we can see that from the commit's contents already.
5. Reference issues and pull requests as appropriate ("see #5", "solves #22").

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Explain why you're submitting this PR. Think of this description as a summary of the commit messages, and adopt a similar style; Why over What.
- Don't forget to [link your PR to its issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
- Once you submit your PR, we'll review your proposal. We may ask questions or request additional information, or we may ask for changes to be made before the PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. Feel free to reply in-line on Github or add additional commits to resolve the comments.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Merging the PR

Thanks a ton for your contribution!

Depending on the nature of your PR, you may see your changes reflected immediately in our demo app and [on Github's contributor page](https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager/graphs/contributors).

We rely on folks like you to make this project happen, so once again, from the bottom of our hearts, thanks a million :)
