import { Application } from "probot" // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on(["pull_request.opened", "pull_request.reopened"], async (context) => {
    context.github.issues.createComment(
      context.issue({
        body: `Thanks for contributing @${context.payload.pull_request.user.login}!

Don't forget to check your commit message format. We use a semantic release manager that will automatically determine the next version number based on your commit messages. It is recommended that you use the commitizen cli tool to build your commit messages: https://github.com/commitizen/cz-cli.

Your commits should follow this shape:

\`\`\`
fix: 🐛 fix getBoundingClientRect of undefined error for tabs

Mousing over a nested tab inside tabs causes the above error. This is due
to using a unique identifier for the key of the component on every render so the
original ref is no longer there.

Closes: ENG-7550
\`\`\`
Another example with a breaking change:

\`\`\`
feat: 🎸 update PopOut functionality for close events

Add closeOnScroll, closeOnOuterClick, closeOnFirstClick.
Fix Portal blocking scroll. Use absolute positioning for Portal.

BREAKING CHANGE: Interface for PopOut has changed

Closes: ENG-7298
\`\`\`

More info can be found here [Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
        `,
      })
    )
  })

  app.on("*", async (context) => {
    context.log.info({ event: context.event, action: context.payload.action })
  })
}
